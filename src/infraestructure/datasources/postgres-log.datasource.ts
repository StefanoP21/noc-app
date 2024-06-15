import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    await prisma.log.create({
      data: {
        ...log,
        level: level,
      },
    });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prisma.log.findMany({
      where: { level },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
