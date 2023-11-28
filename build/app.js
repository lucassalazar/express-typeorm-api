"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const error_middleware_1 = require("@http/middlewares/error.middleware");
const routes_1 = __importDefault(require("@/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
app.use("*", (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Invalid route",
    });
});
app.use(error_middleware_1.ErrorHandler.handleErrors);
exports.default = app;
