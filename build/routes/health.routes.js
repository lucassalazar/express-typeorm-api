"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const error_middleware_1 = require("@http/middlewares/error.middleware");
const response_util_1 = __importDefault(require("@/utils/response.util"));
const healthRouter = (0, express_1.Router)();
healthRouter.get("/", error_middleware_1.ErrorHandler.catchErrors((req, res) => {
    return response_util_1.default.sendResponse(res, "Health check successful", undefined, http_status_codes_1.StatusCodes.OK);
}));
exports.default = healthRouter;
