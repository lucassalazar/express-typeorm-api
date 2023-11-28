import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/types/custom";
import jwt, { JwtPayload } from "jsonwebtoken";
import ResponseUtil from "@/utils/response.util";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "@database/data-source";
import { User } from "@database/entities/user";
import config from "@/config";

export class AuthMiddleware {
  static async authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { authorization: tokenHeader } = req.headers;

    if (!tokenHeader) {
      return ResponseUtil.sendError(
        res,
        "Token was not provided",
        StatusCodes.UNAUTHORIZED,
      );
    }

    const token = tokenHeader.split(" ")[1];

    try {
      const decoded = (await jwt.verify(
        token,
        config.ACCESS_KEY_SECRET,
      )) as JwtPayload;
      const { userId: id } = decoded;
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneByOrFail({ id });
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return ResponseUtil.sendError(
        res,
        "Invalid token",
        StatusCodes.UNAUTHORIZED,
      );
    }
  }
}
