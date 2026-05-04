import { TEMPLATES } from "../constants/mail-templates";

export type MailTemplate = keyof typeof TEMPLATES;

export type SendMailOptions = {
  to: string | string[];
  subject: string;
  template: MailTemplate;
  context?: Record<string, unknown>;
}

export interface MailService {
  sendMail({ to, subject, template, context }: SendMailOptions): Promise<void>
}