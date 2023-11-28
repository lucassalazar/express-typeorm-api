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
const bcryptjs_1 = require("bcryptjs");
const auth_dto_1 = require("@http/dtos/auth.dto");
const class_validator_1 = require("class-validator");
const data_source_1 = require("@database/data-source");
const user_1 = require("@database/entities/user");
const response_util_1 = __importDefault(require("@/utils/response.util"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("@/config"));
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerData = req.body;
            const dto = new auth_dto_1.RegisterDTO();
            dto.name = registerData.name;
            dto.email = registerData.email;
            dto.password = registerData.password;
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(user_1.User);
            const user = repo.create(dto);
            yield repo.save(user);
            return response_util_1.default.sendResponse(res, "Successfully registered new user", user, http_status_codes_1.StatusCodes.CREATED);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = req.body;
            const dto = new auth_dto_1.LoginDTO();
            Object.assign(dto, loginData);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(user_1.User);
            const user = yield repo.findOneBy({ email: dto.email });
            if (!user) {
                return response_util_1.default.sendError(res, "Invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const passwordMatches = yield (0, bcryptjs_1.compare)(dto.password, user.password);
            if (!passwordMatches) {
                return response_util_1.default.sendError(res, "Invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const accessToken = (0, jsonwebtoken_1.sign)({ userId: user.id }, config_1.default.ACCESS_KEY_SECRET, {
                expiresIn: "30m", // 30 minutes
            });
            const formattedUser = user.toResponse();
            return response_util_1.default.sendResponse(res, "Successful login", {
                user: formattedUser,
                accessToken,
            });
        });
    }
}
exports.default = new AuthController();
