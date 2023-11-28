import { Router } from "express";
import authorsController from "@http/controllers/authors.controller";
import { ErrorHandler } from "@http/middlewares/error.middleware";
import { FileUploader } from "@http/middlewares/file-uploader.middleware";
import { AuthMiddleware } from "@http/middlewares/auth.middleware";
import { AdminMiddleware } from "@http/middlewares/admin.middleware";

const authorsRouter = Router();

authorsRouter.get("/", ErrorHandler.catchErrors(authorsController.getAll));
authorsRouter.get(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(authorsController.get),
);
authorsRouter.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(authorsController.create),
);
authorsRouter.put(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  ErrorHandler.catchErrors(authorsController.update),
);
authorsRouter.delete(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  ErrorHandler.catchErrors(authorsController.delete),
);

export default authorsRouter;
