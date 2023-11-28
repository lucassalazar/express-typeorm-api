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
exports.SeedAdminUser1701147967618 = void 0;
const data_source_1 = require("@database/data-source");
const user_1 = require("@database/entities/user");
const config_1 = __importDefault(require("@/config"));
class SeedAdminUser1701147967618 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(user_1.User);
            const userData = new user_1.User();
            userData.email = config_1.default.ADMIN_EMAIL;
            userData.name = config_1.default.ADMIN_NAME;
            userData.role = config_1.default.ADMIN_ROLE;
            userData.password = config_1.default.ADMIN_PASSWORD;
            const user = repo.create(userData);
            yield repo.save(user);
            console.info("Done.");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(user_1.User);
            const user = yield repo.findOneBy({
                email: config_1.default.ADMIN_EMAIL,
            });
            if (user) {
                yield repo.remove(user);
            }
        });
    }
}
exports.SeedAdminUser1701147967618 = SeedAdminUser1701147967618;
