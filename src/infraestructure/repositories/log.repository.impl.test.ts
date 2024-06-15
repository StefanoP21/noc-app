import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';

describe('LogRepository - Impl', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockLogRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saveLog should call the datasource with arguments', async () => {
    const newLog = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'log.repository.impl.test.ts',
    });

    await mockLogRepository.saveLog(newLog);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(newLog);
  });

  it('getLogs should call the datasource with arguments', async () => {
    await mockLogRepository.getLogs(LogSeverityLevel.low);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.low
    );
  });
});
