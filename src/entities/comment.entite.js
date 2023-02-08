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
exports.Comment = void 0;
const product_entite_1 = require("./product.entite");
const typeorm_1 = require("typeorm");
const users_entite_1 = require("./users.entite");
let Comment = class Comment {
    comment_id;
    createDate;
    updateDate;
    comment_pro;
    comment_user;
    comment;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Comment.prototype, "comment_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Comment.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Comment.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entite_1.Product, (comment_pro) => comment_pro.pro_comment),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entite_1.Product)
], Comment.prototype, "comment_pro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entite_1.Users, (comment_user) => comment_user.user_comment),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entite_1.Users)
], Comment.prototype, "comment_user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.Comment = Comment;
