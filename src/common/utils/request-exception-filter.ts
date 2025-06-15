import { HttpStatus, HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

/**
 * Take response object and return message, status info
 * @param error
 */
export const getErrorInfoFromResponse = (error: AxiosError) => {
    const message = error?.message || 'Internal Server Error';
    const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    return { message, status };
};

/**
 * Request exception handler
 * @param error
 */
export const exceptionHandler = (error: AxiosError): void => {
    const { status, message } = getErrorInfoFromResponse(error);
    throw new HttpException(message, status);
};
