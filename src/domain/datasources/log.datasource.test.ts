import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'log.datasource.test.ts',
  });

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  it('should test the abstract class', async () => {
    const mockLogDataSource = new MockLogDatasource();

    expect(mockLogDataSource).toBeInstanceOf(MockLogDatasource);

    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(typeof mockLogDataSource.getLogs).toBe('function');

    await mockLogDataSource.saveLog(newLog);
    const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);

    expect(logs).toEqual([newLog]);
  });
});
