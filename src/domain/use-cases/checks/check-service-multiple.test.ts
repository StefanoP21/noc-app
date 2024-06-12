import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('CheckServiceMultiple - UseCase', () => {
  const mockLogRepository = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ];

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    mockLogRepository,
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call successCallback callback when service is working', async () => {
    const result = await checkServiceMultiple.execute('https://google.com');

    expect(result).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockLogRepository[0].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository[1].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository[2].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it('should call errorCallback callback when service is not working', async () => {
    const result = await checkServiceMultiple.execute(
      'https://google-error.com'
    );

    expect(result).toBe(false);
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockLogRepository[0].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository[1].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository[2].saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
