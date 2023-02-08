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
exports.Karzinka = void 0;
const product_entite_1 = require("./product.entite");
const typeorm_1 = require("typeorm");
const users_entite_1 = require("./users.entite");
let Karzinka = class Karzinka {
    karzinka_id;
    createDate;
    updateDate;
    karzinka_pro;
    karzinka_user;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Karzinka.prototype, "karzinka_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Karzinka.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Karzinka.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entite_1.Product, (karzinka_pro) => karzinka_pro.pro_karzinka),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entite_1.Product)
], Karzinka.prototype, "karzinka_pro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entite_1.Users, (karzinka_user) => karzinka_user.user_karzinka),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entite_1.Users)
], Karzinka.prototype, "karzinka_user", void 0);
Karzinka = __decorate([
    (0, typeorm_1.Entity)()
], Karzinka);
exports.Karzinka = Karzinka;
