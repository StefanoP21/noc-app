import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(newLog);

    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if (newLog.level === LogSeverityLevel.low) return Promise.resolve();

    const newLogPath =
      newLog.level === LogSeverityLevel.medium
        ? this.mediumLogsPath
        : this.highLogsPath;

    fs.appendFileSync(newLogPath, `${logAsJson}\n`);

    return Promise.resolve();
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
