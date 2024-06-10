import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongodb';
import { ServerApp } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.log.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'High level log message',
  //     origin: 'app.ts',
  //   },
  // });

  const logs = await prisma.log.findMany({
    where: {
      level: 'LOW',
    },
  });

  console.log(logs);

  // ServerApp.start();
}
