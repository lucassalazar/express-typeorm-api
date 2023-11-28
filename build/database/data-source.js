"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const author_1 = require("@database/entities/author");
const book_1 = require("@database/entities/book");
const user_1 = require("@database/entities/user");
const config_1 = __importDefault(require("@/config"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.default.DB_HOST,
    port: Number(config_1.default.DB_PORT),
    username: config_1.default.DB_USER,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_DATABASE,
    logging: ["query"],
    synchronize: false,
    entities: [author_1.Author, book_1.Book, user_1.User],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: ["src/database/subscribers/**/*.ts"],
});
