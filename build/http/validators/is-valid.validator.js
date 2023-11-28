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
exports.IsValid = exports.IsValidIdConstraint = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = require("@database/data-source");
let IsValidIdConstraint = class IsValidIdConstraint {
    defaultMessage() {
        return `$property does not exist`;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [entity, field] = args.constraints;
            const repository = data_source_1.AppDataSource.getRepository(entity);
            const count = yield repository.count({ where: { [field]: value } });
            return count === 1;
        });
    }
};
exports.IsValidIdConstraint = IsValidIdConstraint;
exports.IsValidIdConstraint = IsValidIdConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsValidIdConstraint);
function IsValid(entity, field, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, field],
            validator: IsValidIdConstraint,
        });
    };
}
exports.IsValid = IsValid;
