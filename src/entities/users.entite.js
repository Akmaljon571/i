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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const comment_entite_1 = require("./comment.entite");
const karzinka_entite_1 = require("./karzinka.entite");
let Users = class Users {
    user_id;
    createDate;
    updateDate;
    user_name;
    user_img;
    user_phone;
    user_email;
    user_pol;
    user_password;
    user_karzinka;
    user_comment;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Users.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Users.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_img", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "user_pol", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
        select: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => karzinka_entite_1.Karzinka, (user_karzinka) => user_karzinka.karzinka_user, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Users.prototype, "user_karzinka", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entite_1.Comment, (user_comment) => user_comment.comment_user, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Users.prototype, "user_comment", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
