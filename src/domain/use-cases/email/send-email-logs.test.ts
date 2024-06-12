import { LogEntity } from '../../entities/log.entity';
import { SendEmailLogs } from './send-email-logs';

describe('SendEmailLogs - UseCase', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const senEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendEmail and saveLog', async () => {
    const result = await senEmailLogs.execute('aldair112012@outlook.es');

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      'aldair112012@outlook.es'
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it('should call sendEmail and saveLog with error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await senEmailLogs.execute('aldair112012@outlook.es');

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      'aldair112012@outlook.es'
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
