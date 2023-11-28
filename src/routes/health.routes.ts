import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "@http/middlewares/error.middleware";
import ResponseUtil from "@/utils/response.util";

const healthRouter = Router();

healthRouter.get(
  "/",
  ErrorHandler.catchErrors((req: Request, res: Response) => {
    return ResponseUtil.sendResponse(
      res,
      "Health check successful",
      undefined,
      StatusCodes.OK,
    );
  }),
);

export default healthRouter;
