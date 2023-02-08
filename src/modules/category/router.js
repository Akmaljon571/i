"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middleWare/validate"));
const verifyToken_1 = __importDefault(require("../../middleWare/verifyToken"));
const category_1 = require("./category");
exports.default = (0, express_1.Router)()
    .get("/", verifyToken_1.default, category_1.GET)
    .post("/create", verifyToken_1.default, (0, validate_1.default)(validation_1.createCategory), category_1.POST)
    .put("/update/:id", verifyToken_1.default, (0, validate_1.default)(validation_1.updateCategory), category_1.PUT)
    .delete("/delete/:id", verifyToken_1.default, category_1.DELETE)
    .get("/:id", verifyToken_1.default, category_1.subCategory);
