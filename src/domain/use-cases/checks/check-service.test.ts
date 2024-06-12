import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('CheckService - UseCase', () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call successCallback callback when service is working', async () => {
    const result = await checkService.execute('https://google.com');

    expect(result).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it('should call errorCallback callback when service is not working', async () => {
    const result = await checkService.execute('https://google-error.com');

    expect(result).toBe(false);
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
