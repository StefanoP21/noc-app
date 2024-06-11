import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init.ts', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should connect to MongoDB', async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connected).toBe(true);
  });

  it('should throw an error when connection fails', async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://localhost:27017',
        dbName: process.env.MONGO_DB_NAME!,
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
