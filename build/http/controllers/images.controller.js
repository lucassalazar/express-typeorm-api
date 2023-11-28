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
const response_util_1 = __importDefault(require("@/utils/response.util"));
const http_status_codes_1 = require("http-status-codes");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
class ImagesController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource, id } = req.params;
            const imagesResources = ["authors", "books"];
            if (!imagesResources.includes(resource)) {
                return response_util_1.default.sendError(res, "Invalid image resource", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const filePath = path_1.default.join(__dirname, "..", "..", "..", "uploads", resource, id);
            if (!fs_1.default.existsSync(filePath)) {
                return response_util_1.default.sendError(res, "Image not found", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            try {
                const data = yield promises_1.default.readFile(filePath);
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .set("Content-type", "image/jpeg")
                    .send(data);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (err) {
                return response_util_1.default.sendError(res, "Error while reading image", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = new ImagesController();
