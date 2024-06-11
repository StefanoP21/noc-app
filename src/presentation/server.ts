// import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infraestructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
// import { EmailService } from './email/email-service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

// const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log('Server started!');

    //* Use cases
    // new SendEmailLogs(emailService, logRepository).execute([
    //   'aldair112012@outlook.es',
    // ]);

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`Success: ${url}`),
        (error) => console.log(`Error: ${error}`)
      ).execute(url);
    });
  }
}
