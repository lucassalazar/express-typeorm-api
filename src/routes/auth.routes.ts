import { Router } from "express";
import authController from "@http/controllers/auth.controller";
import { ErrorHandler } from "@http/middlewares/error.middleware";

const authRouter = Router();

authRouter.post("/register", ErrorHandler.catchErrors(authController.register));
authRouter.post("/login", ErrorHandler.catchErrors(authController.login));

export default authRouter;
