import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class ServerApp {
  public static start() {
    console.log('Server started!');

    const url = 'http://localhost:3000/';

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Success: ${url}`),
        (error) => console.log(`Error: ${error}`)
      ).execute(url);
    });
  }
}
