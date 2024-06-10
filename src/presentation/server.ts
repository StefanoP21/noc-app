import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const logRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new MongoLogDataSource()
);

const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log('Server started!');

    // const url = 'https://google.com';

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    //* Use cases
    // new SendEmailLogs(emailService, logRepository).execute([
    //   'aldair112012@outlook.es',
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Success: ${url}`),
    //     (error) => console.log(`Error: ${error}`)
    //   ).execute(url);
    // });
  }
}
