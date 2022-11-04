import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

class ErrorHandler {
  public static handle(error: HttpException, _req: Request, res: Response, next: NextFunction) {
    res.status(error.status).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;
