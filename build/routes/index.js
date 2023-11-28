"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("@/routes/auth.routes"));
const authors_routes_1 = __importDefault(require("@/routes/authors.routes"));
const books_routes_1 = __importDefault(require("@/routes/books.routes"));
const health_routes_1 = __importDefault(require("@/routes/health.routes"));
const images_routes_1 = __importDefault(require("@/routes/images.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/authors", authors_routes_1.default);
router.use("/books", books_routes_1.default);
router.use("/health", health_routes_1.default);
router.use("/images", images_routes_1.default);
exports.default = router;
