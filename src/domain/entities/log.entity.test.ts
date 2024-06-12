import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity.ts', () => {
  it('should create a LogEntity instance', () => {
    const newLog = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'log.entity.test.ts',
    });

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  it('should create a LogEntity instance from JSON', () => {
    const json =
      '{"level":"low","message":"Service https://google.com is working","origin":"check-service.ts","createdAt":"2024-06-11T03:15:00.205Z"}';

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should throw an error when creating a LogEntity instance from JSON without required fields', () => {
    const json =
      '{"level":"low","message":"Service https://google.com is working","origin":"check-service.ts"}';

    expect(() => LogEntity.fromJson(json)).toThrow(
      'Missing required fields in log entity'
    );
  });

  it('should create a LogEntity instance from object', () => {
    const object = {
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'log.entity.test.ts',
      createdAt: new Date(),
    };

    const log = LogEntity.fromObject(object);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should throw an error when creating a LogEntity instance from object without required fields', () => {
    const object = {
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'log.entity.test.ts',
    };

    expect(() => LogEntity.fromObject(object)).toThrow(
      'Missing required fields in log entity'
    );
  });
});
