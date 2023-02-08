"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byProduct = exports.DELETE = exports.POST = exports.GET = void 0;
const ormconfig_1 = require("./../../config/ormconfig");
const karzinka_entite_1 = require("../../entities/karzinka.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const product_entite_1 = require("../../entities/product.entite");
const users_entite_1 = require("../../entities/users.entite");
const GET = async (req, res, next) => {
    try {
        const { userId } = req;
        const allKarzinka = await ormconfig_1.dataSourse.getRepository(users_entite_1.Users).find({
            relations: {
                user_karzinka: {
                    karzinka_pro: true,
                },
            },
            where: {
                user_id: userId,
            },
        });
        res.json({
            message: "Ok",
            status: 200,
            data: allKarzinka,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
const POST = async (req, res, next) => {
    try {
        const { productId } = req.result;
        const { userId } = req;
        const newKarzinka = await ormconfig_1.dataSourse
            .getRepository(karzinka_entite_1.Karzinka)
            .createQueryBuilder()
            .insert()
            .into(karzinka_entite_1.Karzinka)
            .values({ karzinka_user: userId, karzinka_pro: productId })
            .returning("*")
            .execute();
        res.json({
            message: "Create",
            status: 201,
            data: newKarzinka.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const DELETE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findKarzinka = await ormconfig_1.dataSourse.getRepository(karzinka_entite_1.Karzinka).findOneBy({ karzinka_id: id });
        if (findKarzinka) {
            const deleteKarzinka = await ormconfig_1.dataSourse
                .getRepository(karzinka_entite_1.Karzinka)
                .createQueryBuilder()
                .delete()
                .from(karzinka_entite_1.Karzinka)
                .where({ karzinka_id: id })
                .returning("*")
                .execute();
            res.json({
                message: "Delete",
                status: 204,
                data: deleteKarzinka.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Karzinka Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
const byProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productBy = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).findOne({
            relations: {
                pro_karzinka: true,
            },
            where: {
                pro_id: id,
            },
        });
        res.json({
            message: "OK",
            status: 200,
            data: productBy,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.byProduct = byProduct;
