"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProduct = joi_1.default.object({
    name: joi_1.default.string().max(50).required(),
    price: joi_1.default.number().required(),
    razmer: joi_1.default.string(),
    gender: joi_1.default.valid("Erkaklar uchun", "Ayollar uchun"),
    after: joi_1.default.string(),
    madeIn: joi_1.default.string(),
    language: joi_1.default.string(),
    subId: joi_1.default.string().required(),
});
exports.updateProduct = joi_1.default.object({
    name: joi_1.default.string().max(50),
    price: joi_1.default.number(),
    razmer: joi_1.default.string(),
    gender: joi_1.default.valid("Erkaklar uchun", "Ayollar uchun"),
    after: joi_1.default.string(),
    madeIn: joi_1.default.string(),
    language: joi_1.default.string(),
    subId: joi_1.default.string(),
});
