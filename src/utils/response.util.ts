import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PaginationInfo } from "@database/paginator";

class ResponseUtil {
  static sendResponse<T>(
    res: Response,
    message: string,
    data: T,
    statusCode: number = StatusCodes.OK,
    paginationInfo?: PaginationInfo,
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      paginationInfo,
    });
  }

  static sendError<T>(
    res: Response,
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    error?: T,
  ): Response<T> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}

export default ResponseUtil;
