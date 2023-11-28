"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_controller_1 = __importDefault(require("@http/controllers/images.controller"));
const error_middleware_1 = require("@http/middlewares/error.middleware");
const imagesRouter = (0, express_1.Router)();
imagesRouter.get("/:resource/:id", error_middleware_1.ErrorHandler.catchErrors(images_controller_1.default.get));
exports.default = imagesRouter;
