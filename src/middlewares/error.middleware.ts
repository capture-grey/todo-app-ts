import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

// 404 not found handler
function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = err.status || err.statusCode || 500;
  
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(status);

  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "Error page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
}

export {
  notFoundHandler,
  errorHandler,
};