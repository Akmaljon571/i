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
exports.subCategory = void 0;
const typeorm_1 = require("typeorm");
const category_entite_1 = require("./category.entite");
const product_entite_1 = require("./product.entite");
let subCategory = class subCategory {
    sub_id;
    createDate;
    updateDate;
    sub_title;
    sub_cat;
    sub_product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], subCategory.prototype, "sub_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], subCategory.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], subCategory.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], subCategory.prototype, "sub_title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entite_1.Category, (sub_cat) => sub_cat.cat_sub),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", category_entite_1.Category)
], subCategory.prototype, "sub_cat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entite_1.Product, (sub_product) => sub_product.pro_sub, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], subCategory.prototype, "sub_product", void 0);
subCategory = __decorate([
    (0, typeorm_1.Entity)()
], subCategory);
exports.subCategory = subCategory;
