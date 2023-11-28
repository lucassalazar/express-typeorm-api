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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_util_1 = __importDefault(require("@/utils/response.util"));
const http_status_codes_1 = require("http-status-codes");
const data_source_1 = require("@database/data-source");
const user_1 = require("@database/entities/user");
const config_1 = __importDefault(require("@/config"));
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization: tokenHeader } = req.headers;
            if (!tokenHeader) {
                return response_util_1.default.sendError(res, "Token was not provided", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const token = tokenHeader.split(" ")[1];
            try {
                const decoded = (yield jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_KEY_SECRET));
                const { userId: id } = decoded;
                const repo = data_source_1.AppDataSource.getRepository(user_1.User);
                const user = yield repo.findOneByOrFail({ id });
                req.user = user;
                next();
            }
            catch (err) {
                console.error(err);
                return response_util_1.default.sendError(res, "Invalid token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
