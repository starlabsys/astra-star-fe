export interface ReturnResult {
  message: string;
  statusCode: number;
  data: any;
}

export class ErrorData implements Error {
  name: string;
  message: string;
  status: number;
  stack?: string | undefined;
  cause?: unknown;

  constructor(message: string, status: number, cause?: unknown) {
    this.name = "Error";
    this.message = message;
    this.cause = cause;
    this.status = status;
  }
}
