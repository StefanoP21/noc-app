import mongoose from 'mongoose';
import { LogModel } from './log.model';
import { MongoDatabase } from '../init';
import { envs } from '../../../config/plugins/envs.plugin';

describe('log.model.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should return LogModel', async () => {
    const logData = {
      level: 'low',
      message: 'test message',
      origin: 'log.model.test.ts',
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  it('should return the schema object', async () => {
    const logSchema = LogModel.schema.obj;

    expect(logSchema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        createdAt: {
          type: expect.any(Function),
          default: expect.any(Date),
        },
      })
    );
  });
});
