"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = void 0;
const response_util_1 = __importDefault(require("@/utils/response.util"));
const http_status_codes_1 = require("http-status-codes");
const roles_1 = require("@/constants/roles");
class AdminMiddleware {
    static isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUser = req.user;
            if (!requestUser || requestUser.role !== roles_1.Roles.ADMIN) {
                return response_util_1.default.sendError(res, "Access denied. The user doesn't have the necessary permissions to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
            }
            next();
        });
    }
}
exports.AdminMiddleware = AdminMiddleware;
