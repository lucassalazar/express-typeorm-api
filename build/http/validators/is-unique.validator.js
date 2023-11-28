"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.IsUnique = exports.IsUniqueConstraint = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = require("@database/data-source");
const typeorm_1 = require("typeorm");
let IsUniqueConstraint = class IsUniqueConstraint {
    defaultMessage() {
        return `$property is already in use`;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [entity, field] = args.constraints;
            const repository = data_source_1.AppDataSource.getRepository(entity);
            const isUpdate = args.object["id"] !== undefined;
            let count = 0;
            if (!isUpdate) {
                count = yield repository.count({ where: { [field]: value } });
            }
            else {
                count = yield repository.count({
                    where: { [field]: value, id: (0, typeorm_1.Not)(args.object["id"]) },
                });
            }
            return count <= 0;
        });
    }
};
exports.IsUniqueConstraint = IsUniqueConstraint;
exports.IsUniqueConstraint = IsUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsUniqueConstraint);
function IsUnique(entity, field, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, field],
            validator: IsUniqueConstraint,
        });
    };
}
exports.IsUnique = IsUnique;
