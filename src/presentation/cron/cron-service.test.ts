import { CronService } from './cron-service';

describe('Cron - Service', () => {
  it('should create a job', (done) => {
    const mockCronTime = '* * * * * *';
    const mockOnTick = jest.fn();

    const job = CronService.createJob(mockCronTime, mockOnTick);

    setTimeout(() => {
      expect(mockOnTick).toHaveBeenCalledTimes(2);
      job.stop();

      done();
    }, 2000);
  });
});
