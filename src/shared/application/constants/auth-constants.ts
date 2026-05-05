export class AuthConstants {
  static readonly tokenName =
    process.env.NODE_ENV !== 'production'
      ? `${process.env.NODE_ENV}AuthToken`
      : `authToken`;

  static readonly tokenForgotPassword = process.env.NODE_ENV !== 'production'
    ? `${process.env.NODE_ENV}ForgotToken`
    : `ForgotToken`;

  static readonly tokenHeader = 'Authorization';
}
