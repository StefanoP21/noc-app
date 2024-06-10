import { $Enums, PrismaClient, SeverityLevel } from '@prisma/client';
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
    try {
      const level = severityEnum[log.level];
      const newLog = await prisma.log.create({
        data: {
          ...log,
          level: level,
        },
      });

      console.log('Postgres log saved:', newLog.id);
    } catch (error) {
      console.error('Error saving log:', error);
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const level = severityEnum[severityLevel];
      const logs = await prisma.log.findMany({
        where: { level },
      });

      return logs.map((log) => LogEntity.fromObject(log));
    } catch (error) {
      console.error('Error getting logs:', error);
      return [];
    }
  }
}
