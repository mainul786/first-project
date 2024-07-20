import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';

export type TErrorSource = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode =  500;
 let message ='something went is wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went is wrong!',
    },
  ];

  // const statusCode = 400;

  

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
   statusCode = simplifiedError?.statusCode;
   message = simplifiedError?.message;
   errorSources = simplifiedError?.errorSources.
  }

  return res.status(statusCode).json( {
    success:false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  })
};
export default globalErrorHandler;
