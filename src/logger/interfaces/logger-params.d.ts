export interface ILoggerParams {
  message: string;
  correlationId?: string;
  userId?: string;
  productId?: string | null;
  className: string;
  payload?: any;
  error?: string;
}
