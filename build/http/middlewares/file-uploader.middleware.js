"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class FileUploader {
    static upload(fileFieldName, folderName, fileSize, fileTypes = ["image/jpeg", "image/png"]) {
        const storage = multer_1.default.diskStorage({
            destination: (req, res, cb) => {
                const uploadsFolder = path_1.default.resolve(`uploads`);
                const folder = path_1.default.resolve(`uploads/${folderName}`);
                if (!fs_1.default.existsSync(uploadsFolder)) {
                    fs_1.default.mkdirSync(uploadsFolder);
                }
                if (!fs_1.default.existsSync(folder)) {
                    fs_1.default.mkdirSync(folder);
                }
                cb(null, folder);
            },
            filename: (req, file, cb) => {
                cb(null, crypto_1.default.randomBytes(16).toString("hex") +
                    path_1.default.extname(file.originalname));
            },
        });
        const fileFilter = (req, file, cb) => {
            if (fileTypes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error("Invalid file type"), false);
            }
        };
        const upload = (0, multer_1.default)({
            storage: storage,
            limits: { fileSize: fileSize },
            fileFilter,
        }).single(fileFieldName);
        return upload;
    }
}
exports.FileUploader = FileUploader;
