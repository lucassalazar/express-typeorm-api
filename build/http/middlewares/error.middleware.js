"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const typeorm_1 = require("typeorm");
const response_util_1 = __importDefault(require("@/utils/response.util"));
const http_status_codes_1 = require("http-status-codes");
const class_validator_1 = require("class-validator");
class ErrorHandler {
    static catchErrors(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
    static handleErrors(err, _req, res, _next) {
        console.error(err);
        if (err instanceof typeorm_1.EntityNotFoundError) {
            return response_util_1.default.sendError(res, "Item/page you are looking for does not exist.", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (Array.isArray(err) &&
            err.length > 0 &&
            err[0] instanceof class_validator_1.ValidationError) {
            const errors = ErrorHandler.formatErrors(err);
            return response_util_1.default.sendError(res, "Invalid input", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, errors);
        }
        if (err instanceof Error && err.message === "Invalid file type") {
            return response_util_1.default.sendError(res, "Invalid File Type", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        }
        return response_util_1.default.sendError(res, "Something went wrong", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    static formatErrors(err) {
        const errors = {};
        err.forEach((e) => {
            if (!errors[e.property]) {
                errors[e.property] = [];
            }
            if (e.constraints) {
                errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]]);
            }
        });
        return errors;
    }
}
exports.ErrorHandler = ErrorHandler;
