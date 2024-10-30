import { ApiError } from "exceptions";
import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    message: `Server error ${err.message}`,
  });
};
