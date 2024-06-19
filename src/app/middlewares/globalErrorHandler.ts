import e, { NextFunction, Response, Request } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'something went is wrong!';
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
export default globalErrorHandler;
