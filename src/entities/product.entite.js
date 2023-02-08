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
exports.Product = void 0;
const subcategory_entite_1 = require("./subcategory.entite");
const typeorm_1 = require("typeorm");
const karzinka_entite_1 = require("./karzinka.entite");
const comment_entite_1 = require("./comment.entite");
let Product = class Product {
    pro_id;
    createDate;
    updateDate;
    pro_name;
    pro_price;
    pro_img1;
    pro_img2;
    pro_razmer;
    pro_pol;
    pro_after;
    pro_in;
    pro_langu;
    pro_karzinka;
    pro_comment;
    pro_sub;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Product.prototype, "pro_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Product.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Product.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "pro_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_img1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_img2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_razmer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "pro_pol", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_after", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_in", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "pro_langu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => karzinka_entite_1.Karzinka, (pro_karzinka) => pro_karzinka.karzinka_pro, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Product.prototype, "pro_karzinka", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entite_1.Comment, (pro_comment) => pro_comment.comment_pro, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Product.prototype, "pro_comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subcategory_entite_1.subCategory, (pro_sub) => pro_sub.sub_product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", subcategory_entite_1.subCategory)
], Product.prototype, "pro_sub", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
