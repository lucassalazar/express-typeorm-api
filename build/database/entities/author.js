"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const typeorm_1 = require("typeorm");
const db_table_1 = require("@/constants/db-table");
const book_1 = require("@database/entities/book");
const image_util_1 = __importDefault(require("@/utils/image.util"));
const common_1 = require("@database/entities/common");
let Author = class Author extends common_1.Common {
    toPayload() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            bio: this.bio,
            image: image_util_1.default.prepareUrl("authors", this.image),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
};
exports.Author = Author;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Author.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Author.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => book_1.Book, (book) => book.author),
    __metadata("design:type", Array)
], Author.prototype, "books", void 0);
exports.Author = Author = __decorate([
    (0, typeorm_1.Entity)(db_table_1.DBTable.AUTHORS)
], Author);
