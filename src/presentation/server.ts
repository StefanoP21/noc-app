import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class ServerApp {
  public static start() {
    console.log('Server started!');

    const url = 'https://google.com';

    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'aldair112012@outlook.es',
      subject: 'Logs del sistema',
      html: `
      <h3>Logs de sistema - NOC</h3>
      <p>Ver logs</p>
      `,
    });

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Success: ${url}`),
    //     (error) => console.log(`Error: ${error}`)
    //   ).execute(url);
    // });
  }
}
