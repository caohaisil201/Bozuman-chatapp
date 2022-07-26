import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FORGOT_PASSWORD, ACTIVATE_ACCOUNT } from './Helper.utils';
import dotenv from 'dotenv';
dotenv.config();

export class Email {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  public sendEmail = (emailAddress: string, token: string, type: string) => {
    const mailOptions = {
      from: 'bozuman2022@gmail.com',
      to: emailAddress,
      subject: '',
      html: '',
    };

    switch (type) {
      case ACTIVATE_ACCOUNT:
        mailOptions.subject = 'Activation code';
        mailOptions.html = `<p>Click <a href="${
          process.env.PROJECT_DOMAIN || ''
        }/activate-account?user=${token}">here</a> to activate your account</p>`;
        break;

      case FORGOT_PASSWORD:
        mailOptions.subject = 'Reset password';
        mailOptions.html = `<p>Click <a href="${
          process.env.PROJECT_DOMAIN || ''
        }/reset-password?user=${token}">here</a> to reset your password, it will expire after 60 seconds</p>`;
        break;

      default:
        break;
    }

    this.transporter.sendMail(
      mailOptions,
      function (error: Error | null, info: SMTPTransport.SentMessageInfo) {
        if (error) {
          throw error;
        }
      }
    );
  };
}
