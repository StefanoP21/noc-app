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

  //* Create the logs files if they don't exist
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
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    //* Save the log in the corresponding file
    const newLogPath =
      newLog.level === LogSeverityLevel.medium
        ? this.mediumLogsPath
        : this.highLogsPath;

    fs.appendFileSync(newLogPath, logAsJson);
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');

    //* Split the content by line and parse each line as a LogEntity
    const logs = content
      .trim()
      .split('\n')
      .map((log) => LogEntity.fromJson(log));

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} is not implemented`);
    }
  }
}
