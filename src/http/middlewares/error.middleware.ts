import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";
import ResponseUtil from "@/utils/response.util";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "class-validator";

export class ErrorHandler {
  static catchErrors(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handleErrors(
    err: Error | EntityNotFoundError | ValidationError[],
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.error(err);
    if (err instanceof EntityNotFoundError) {
      return ResponseUtil.sendError(
        res,
        "Item/page you are looking for does not exist.",
        StatusCodes.NOT_FOUND,
      );
    }

    if (
      Array.isArray(err) &&
      err.length > 0 &&
      err[0] instanceof ValidationError
    ) {
      const errors = ErrorHandler.formatErrors(err);

      return ResponseUtil.sendError(
        res,
        "Invalid input",
        StatusCodes.UNPROCESSABLE_ENTITY,
        errors,
      );
    }

    if (err instanceof Error && err.message === "Invalid file type") {
      return ResponseUtil.sendError(
        res,
        "Invalid File Type",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    return ResponseUtil.sendError(
      res,
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  static formatErrors(err: ValidationError[]) {
    const errors = {};
    err.forEach((e: ValidationError) => {
      if (!errors[e.property]) {
        errors[e.property] = [];
      }
      if (e.constraints) {
        errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]]);
      }
    });
    return errors;
  }
}
