"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@/config"));
class ImageUtil {
    static prepareUrl(resource, imageId) {
        return `${config_1.default.APP_URL}:${config_1.default.APP_PORT}/images/${resource}/${imageId}`;
    }
}
exports.default = ImageUtil;
