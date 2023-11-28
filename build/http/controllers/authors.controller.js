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
const data_source_1 = require("@database/data-source");
const author_1 = require("@database/entities/author");
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = __importDefault(require("@/utils/response.util"));
const paginator_1 = require("@database/paginator");
const author_dto_1 = require("@http/dtos/author.dto");
const class_validator_1 = require("class-validator");
class AuthorsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = yield data_source_1.AppDataSource.getRepository(author_1.Author)
                .createQueryBuilder()
                .orderBy("id", "ASC");
            const { records: authors, paginationInfo } = yield paginator_1.Paginator.paginate(builder, req);
            const authorData = authors.map((author) => {
                return author.toPayload();
            });
            return response_util_1.default.sendResponse(res, "Fetched authors successfully", authorData, http_status_codes_1.StatusCodes.OK, paginationInfo);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const author = yield data_source_1.AppDataSource.getRepository(author_1.Author).findOneByOrFail({
                id: Number(id),
            });
            return response_util_1.default.sendResponse(res, "Fetched author successfully", author.toPayload());
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authorData = req.body;
            authorData.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const dto = new author_dto_1.CreateAuthorDTO();
            Object.assign(dto, authorData);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(author_1.Author);
            const author = repo.create(dto);
            yield repo.save(author);
            return response_util_1.default.sendResponse(res, "Successfully created new author", author.toPayload(), http_status_codes_1.StatusCodes.CREATED);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const authorData = req.body;
            const dto = new author_dto_1.UpdateAuthorDTO();
            Object.assign(dto, authorData);
            dto.id = parseInt(id);
            yield (0, class_validator_1.validateOrReject)(dto);
            const repo = data_source_1.AppDataSource.getRepository(author_1.Author);
            const author = yield repo.findOneByOrFail({
                id: Number(id),
            });
            repo.merge(author, dto);
            yield repo.save(author);
            return response_util_1.default.sendResponse(res, "Successfully updated the author", author.toPayload());
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repo = data_source_1.AppDataSource.getRepository(author_1.Author);
            const author = yield repo.findOneByOrFail({
                id: Number(id),
            });
            yield repo.remove(author);
            return response_util_1.default.sendResponse(res, "Successfully deleted the author", author.toPayload());
        });
    }
}
exports.default = new AuthorsController();
