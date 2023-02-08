"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlink = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const unlink = (filename) => fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "src", "uploads", filename));
exports.unlink = unlink;
