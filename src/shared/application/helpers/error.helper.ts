export function getErrorStack(error: unknown): string {
  return error instanceof Error ? error.stack ?? error.message : String(error);
}