import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongodb';
import { ServerApp } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const newLog = await LogModel.create({
  //   level: 'low',
  //   message: 'Test message from MongoDB',
  //   origin: 'app.ts',
  // });

  // await newLog.save();

  // console.log(newLog);

  const logs = await LogModel.find();

  console.log(logs);

  ServerApp.start();
}
