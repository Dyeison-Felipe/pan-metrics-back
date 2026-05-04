import { TEMPLATES } from "@/shared/application/constants/mail-templates";
import { MailService, SendMailOptions } from "@/shared/application/mail/mail.service";
import { MailerService } from '@nestjs-modules/mailer';

export class MailServiceImpl implements MailService {

  constructor(private readonly mailerService: MailerService) { }

  async sendMail({ to, subject, template, context }: SendMailOptions): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      template: TEMPLATES[template],
      context,
    });
  }
}