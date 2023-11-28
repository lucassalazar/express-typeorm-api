"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = __importDefault(require("@http/controllers/books.controller"));
const error_middleware_1 = require("@http/middlewares/error.middleware");
const file_uploader_middleware_1 = require("@http/middlewares/file-uploader.middleware");
const auth_middleware_1 = require("@http/middlewares/auth.middleware");
const admin_middleware_1 = require("@http/middlewares/admin.middleware");
const booksRouter = (0, express_1.Router)();
booksRouter.get("/", error_middleware_1.ErrorHandler.catchErrors(books_controller_1.default.getAll));
booksRouter.get("/:id", error_middleware_1.ErrorHandler.catchErrors(auth_middleware_1.AuthMiddleware.authenticate), error_middleware_1.ErrorHandler.catchErrors(books_controller_1.default.get));
booksRouter.post("/", error_middleware_1.ErrorHandler.catchErrors(auth_middleware_1.AuthMiddleware.authenticate), error_middleware_1.ErrorHandler.catchErrors(admin_middleware_1.AdminMiddleware.isAdmin), file_uploader_middleware_1.FileUploader.upload("image", "books", 2 * 1024 * 1024), error_middleware_1.ErrorHandler.catchErrors(books_controller_1.default.create));
booksRouter.put("/:id", error_middleware_1.ErrorHandler.catchErrors(auth_middleware_1.AuthMiddleware.authenticate), error_middleware_1.ErrorHandler.catchErrors(admin_middleware_1.AdminMiddleware.isAdmin), error_middleware_1.ErrorHandler.catchErrors(books_controller_1.default.update));
booksRouter.delete("/:id", error_middleware_1.ErrorHandler.catchErrors(auth_middleware_1.AuthMiddleware.authenticate), error_middleware_1.ErrorHandler.catchErrors(admin_middleware_1.AdminMiddleware.isAdmin), error_middleware_1.ErrorHandler.catchErrors(books_controller_1.default.delete));
exports.default = booksRouter;
