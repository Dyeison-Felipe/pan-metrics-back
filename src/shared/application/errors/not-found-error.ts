export class NotFoundError extends Error {
  constructor(readonly message: string) {
    super(message);
    this.name = 'Not-Found Error';
  }
}
