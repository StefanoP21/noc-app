import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const emailService = new EmailService();

export class ServerApp {
  public static start() {
    console.log('Server started!');

    // const url = 'https://google.com';

    //* Use cases
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'aldair112012@outlook.es',
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Success: ${url}`),
    //     (error) => console.log(`Error: ${error}`)
    //   ).execute(url);
    // });
  }
}
