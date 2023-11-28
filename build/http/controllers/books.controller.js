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
const data_source_1 = require("../../database/data-source");
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = __importDefault(require("@/utils/response.util"));
const paginator_1 = require("@database/paginator");
const book_dto_1 = require("@http/dtos/book.dto");
const class_validator_1 = require("class-validator");
const book_1 = require("@database/entities/book");
class BooksController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = yield data_source_1.AppDataSource.getRepository(book_1.Book)
                .createQueryBuilder("book")
                .leftJoinAndSelect("book.author", "author")
                .orderBy("book.id", "ASC");
            const { records: books, paginationInfo } = yield paginator_1.Paginator.paginate(builder, req);
            const bookData = books.map((book) => {
                return book.toPayload();
            });
            return response_util_1.default.sendResponse(res, "Fetched books successfully", bookData, http_status_codes_1.StatusCodes.OK, paginationInfo);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const book = yield data_source_1.AppDataSource.getRepository(book_1.Book).findOneByOrFail({
                id: Number(id),
            });
            return response_util_1.default.sendResponse(res, "Fetched book successfully", book.toPayload());
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bookData = req.body;
            bookData.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const dto = new book_dto_1.CreateBookDTO();
            Object.assign(dto, bookData);
            dto.price = parseInt(bookData.price);
            dto.authorId = parseInt(bookData.authorId);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(book_1.Book);
            const book = repo.create(dto);
            yield repo.save(book);
            return response_util_1.default.sendResponse(res, "Successfully created new book", book.toPayload(), http_status_codes_1.StatusCodes.CREATED);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bookData = req.body;
            console.log("ENTROU!", bookData);
            const dto = new book_dto_1.UpdateBookDTO();
            Object.assign(dto, bookData);
            dto.id = parseInt(id);
            dto.price = parseInt(bookData.price);
            dto.authorId = parseInt(bookData.authorId);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(book_1.Book);
            const book = yield repo.findOneByOrFail({
                id: Number(id),
            });
            repo.merge(book, dto);
            yield repo.save(book);
            return response_util_1.default.sendResponse(res, "Successfully updated the book", book.toPayload());
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repo = data_source_1.AppDataSource.getRepository(book_1.Book);
            const book = yield repo.findOneByOrFail({
                id: Number(id),
            });
            yield repo.remove(book);
            return response_util_1.default.sendResponse(res, "Successfully deleted the book", book.toPayload());
        });
    }
}
exports.default = new BooksController();
