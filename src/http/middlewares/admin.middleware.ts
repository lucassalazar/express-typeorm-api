import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/types/custom";
import ResponseUtil from "@/utils/response.util";
import { StatusCodes } from "http-status-codes";
import { Roles } from "@/constants/roles";

export class AdminMiddleware {
  static async isAdmin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const requestUser = req.user;

    if (!requestUser || requestUser.role !== Roles.ADMIN) {
      return ResponseUtil.sendError(
        res,
        "Access denied. The user doesn't have the necessary permissions to perform this action",
        StatusCodes.FORBIDDEN,
      );
    }

    next();
  }
}
