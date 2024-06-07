export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt }: LogEntity = JSON.parse(json);

    //* Check if the required fields are present
    if (!level || !message || !createdAt) {
      throw new Error('Invalid log entity');
    }

    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);

    return log;
  };
}
