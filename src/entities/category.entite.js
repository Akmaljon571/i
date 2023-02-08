"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const subcategory_entite_1 = require("./subcategory.entite");
const typeorm_1 = require("typeorm");
let Category = class Category {
    cat_id;
    createDate;
    updateDate;
    cat_title;
    cat_sub;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "cat_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Category.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Category.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Category.prototype, "cat_title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subcategory_entite_1.subCategory, (cat_sub) => cat_sub.sub_cat, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Category.prototype, "cat_sub", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
