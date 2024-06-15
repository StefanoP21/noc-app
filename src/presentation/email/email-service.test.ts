import { EmailService, SendEmailOptions } from './email-service';

describe('Email - Service', () => {
  it('should return true if email is sent', async () => {
    const emailService = new EmailService();

    const options: SendEmailOptions = {
      to: 'test@gmail.com',
      subject: 'Test email',
      html: '<p>Test email</p>',
    };

    const emailSent = await emailService.sendEmail(options);

    expect(emailSent).toBe(true);
  });

  it('should return true if email with logs attachments is sent', async () => {
    const emailService = new EmailService();

    const emailSent = await emailService.sendEmailWithFileSystemLogs(
      'test@gmail.com'
    );

    expect(emailSent).toBe(true);
  });
});
