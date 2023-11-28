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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
class Paginator {
    static paginate(queryBuilder, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const offset = (page - 1) * pageSize;
            const records = yield queryBuilder.skip(offset).take(pageSize).getMany();
            const totalItems = yield queryBuilder.getCount();
            const pages = Math.ceil(totalItems / pageSize);
            const currentPage = offset / pageSize + 1;
            const hasNext = currentPage < pages;
            const hasPrevious = currentPage > 1;
            const paginationInfo = {
                currentPage: page,
                pageSize,
                totalItems,
                pages,
                hasNext,
                hasPrevious,
            };
            return { records, paginationInfo };
        });
    }
}
exports.Paginator = Paginator;
