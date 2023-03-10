"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubCategory = exports.createSubCategory = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSubCategory = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
    categoryId: joi_1.default.string().required(),
});
exports.updateSubCategory = joi_1.default.object({
    title: joi_1.default.string().max(100),
    categoryId: joi_1.default.string(),
});
