import { Router } from "express";
import booksController from "@http/controllers/books.controller";
import { ErrorHandler } from "@http/middlewares/error.middleware";
import { FileUploader } from "@http/middlewares/file-uploader.middleware";
import { AuthMiddleware } from "@http/middlewares/auth.middleware";
import { AdminMiddleware } from "@http/middlewares/admin.middleware";

const booksRouter = Router();

booksRouter.get("/", ErrorHandler.catchErrors(booksController.getAll));
booksRouter.get(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(booksController.get),
);
booksRouter.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  FileUploader.upload("image", "books", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(booksController.create),
);
booksRouter.put(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  ErrorHandler.catchErrors(booksController.update),
);
booksRouter.delete(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.isAdmin),
  ErrorHandler.catchErrors(booksController.delete),
);

export default booksRouter;
