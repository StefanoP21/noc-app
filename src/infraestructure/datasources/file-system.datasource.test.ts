import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('FileSystem - Datasource', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  it('should create log files if they do not exists', () => {
    new FileSystemDataSource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });

  it('should save a log in logs-all.log', () => {
    const fileSystemDatasource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'This is a low log',
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDatasource.saveLog(log);

    const allLogs = fs.readFileSync(
      path.join(logPath, '/logs-all.log'),
      'utf-8'
    );

    expect(allLogs).toContain(JSON.stringify(log));
  });

  it('should save a log in logs-medium.log', () => {
    const fileSystemDatasource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'This is a medium log',
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDatasource.saveLog(log);

    const mediumLogs = fs.readFileSync(
      path.join(logPath, '/logs-medium.log'),
      'utf-8'
    );

    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  it('should save a log in logs-high.log', () => {
    const fileSystemDatasource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'This is a high log',
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDatasource.saveLog(log);

    const highLogs = fs.readFileSync(
      path.join(logPath, '/logs-high.log'),
      'utf-8'
    );

    expect(highLogs).toContain(JSON.stringify(log));
  });

  it('should return all logs', async () => {
    const fileSystemDatasource = new FileSystemDataSource();

    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'This is a low log',
      origin: 'file-system.datasource.test.ts',
    });

    const mediumLog = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'This is a medium log',
      origin: 'file-system.datasource.test.ts',
    });

    const highLog = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'This is a high log',
      origin: 'file-system.datasource.test.ts',
    });

    await fileSystemDatasource.saveLog(logLow);
    await fileSystemDatasource.saveLog(mediumLog);
    await fileSystemDatasource.saveLog(highLog);

    const logsLow = await fileSystemDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await fileSystemDatasource.getLogs(
      LogSeverityLevel.medium
    );
    const logsHigh = await fileSystemDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual([logLow, mediumLog, highLog]);
    expect(logsMedium).toEqual([mediumLog]);
    expect(logsHigh).toEqual([highLog]);
  });

  it('should throw an error if the severity level do not exist', async () => {
    const fileSystemDatasource = new FileSystemDataSource();

    await expect(
      fileSystemDatasource.getLogs('not-exist' as LogSeverityLevel)
    ).rejects.toThrow('not-exist is not implemented');
  });
});
