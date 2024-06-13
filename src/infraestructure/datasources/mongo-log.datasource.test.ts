import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from '../../data/mongodb';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { MongoLogDataSource } from './mongo-log.datasource';

describe('MongoLog - DataSource', () => {
  const mongoLogDatasource = new MongoLogDataSource();

  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('should create a log', async () => {
    await mongoLogDatasource.saveLog(log);

    const logsCount = await LogModel.countDocuments();
    const savedLog = await LogModel.findOne({ level: log.level });

    expect(logsCount).toBe(1);
    expect(savedLog).toBeTruthy();
  });

  it('should get logs by severity level', async () => {
    await mongoLogDatasource.saveLog(log);

    const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(log.level);
  });
});
