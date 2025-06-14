import { Request as ExpressRequest } from 'express';
import { IncomingHttpHeaders } from 'http';

export default interface Request extends ExpressRequest {
  fileValidationError: string;
  headers: IncomingHttpHeaders & {
    'correlation-id': string;
    'product-id': string;
  };
}
