"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config = {
    APP_URL: String(process.env.APP_URL),
    APP_PORT: Number(process.env.APP_PORT),
    DB_HOST: String(process.env.DB_HOST),
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: String(process.env.DB_USER),
    DB_PASSWORD: String(process.env.DB_PASSWORD),
    DB_DATABASE: String(process.env.DB_DATABASE),
    ACCESS_KEY_SECRET: String(process.env.ACCESS_KEY_SECRET),
    ADMIN_NAME: String(process.env.ADMIN_NAME),
    ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
    ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
    ADMIN_ROLE: Number(process.env.ADMIN_ROLE),
};
exports.default = config;
