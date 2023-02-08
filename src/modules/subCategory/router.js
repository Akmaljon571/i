"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middleWare/validate"));
const verifyToken_1 = __importDefault(require("../../middleWare/verifyToken"));
const validation_1 = require("../category/validation");
const subCategory_1 = require("./subCategory");
const validation_2 = require("./validation");
exports.default = (0, express_1.Router)()
    .get("/", verifyToken_1.default, subCategory_1.GET)
    .post("/create", verifyToken_1.default, (0, validate_1.default)(validation_2.createSubCategory), subCategory_1.POST)
    .put("/update/:id", verifyToken_1.default, (0, validate_1.default)(validation_1.updateCategory), subCategory_1.PUT)
    .delete("/delete/:id", verifyToken_1.default, subCategory_1.DELETE)
    .get("/:id", verifyToken_1.default, subCategory_1.byProduct);
