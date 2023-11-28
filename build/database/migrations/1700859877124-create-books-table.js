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
exports.CreateBooksTable1700859877124 = void 0;
const typeorm_1 = require("typeorm");
const db_table_1 = require("@/constants/db-table");
class CreateBooksTable1700859877124 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: db_table_1.DBTable.BOOKS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "authorId",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "category",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey(db_table_1.DBTable.BOOKS, new typeorm_1.TableForeignKey({
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: db_table_1.DBTable.AUTHORS,
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(db_table_1.DBTable.BOOKS);
        });
    }
}
exports.CreateBooksTable1700859877124 = CreateBooksTable1700859877124;
