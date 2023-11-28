import { Router } from "express";
import imagesController from "@http/controllers/images.controller";
import { ErrorHandler } from "@http/middlewares/error.middleware";

const imagesRouter = Router();

imagesRouter.get(
  "/:resource/:id",
  ErrorHandler.catchErrors(imagesController.get),
);

export default imagesRouter;
