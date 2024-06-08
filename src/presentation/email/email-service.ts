import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  //TODO: attachements
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, html } = options;

    const sentInformation = await this.transporter.sendMail({
      to,
      subject,
      html,
    });

    console.log(sentInformation);

    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
