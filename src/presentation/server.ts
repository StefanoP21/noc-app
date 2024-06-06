import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class ServerApp {
  public static start() {
    console.log('Server started!');

    const url = 'https://www.isdin.com/es-PE/';

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        () => console.log(`Success: ${url}`),
        (error) => console.log(`Error: ${error}`)
      ).execute(url);
    });
  }
}
