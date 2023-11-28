"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("@http/controllers/auth.controller"));
const error_middleware_1 = require("@http/middlewares/error.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", error_middleware_1.ErrorHandler.catchErrors(auth_controller_1.default.register));
authRouter.post("/login", error_middleware_1.ErrorHandler.catchErrors(auth_controller_1.default.login));
exports.default = authRouter;
