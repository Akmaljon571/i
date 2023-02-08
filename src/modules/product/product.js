"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERACH = exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const ormconfig_1 = require("./../../config/ormconfig");
const config_1 = require("../../config");
const product_entite_1 = require("../../entities/product.entite");
const redis_1 = __importDefault(require("./redis"));
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const GET = async (req, res, next) => {
    try {
        const client = await (0, config_1.fetchRedis)();
        const cache = await client.get("allProduct");
        await (0, redis_1.default)();
        if (!cache) {
            const allProduct = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).find();
            await client.set("allProduct", JSON.stringify(allProduct));
            res.json({
                message: "Ok",
                status: 200,
                data: allProduct,
            });
        }
        else {
            const allProduct = JSON.parse(cache);
            res.json({
                message: "Ok",
                status: 200,
                data: allProduct,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
const POST = async (req, res, next) => {
    try {
        const { name, price, razmer, gender, after, madeIn, language, subId } = req.result;
        const rasm = req.files;
        const client = await (0, config_1.fetchRedis)();
        const newProduct = await ormconfig_1.dataSourse
            .getRepository(product_entite_1.Product)
            .createQueryBuilder()
            .insert()
            .into(product_entite_1.Product)
            .values({
            pro_name: name,
            pro_price: price,
            pro_razmer: razmer,
            pro_pol: gender === "Erkaklar uchun" ? true : false,
            pro_after: after,
            pro_in: madeIn,
            pro_langu: language,
            pro_sub: subId,
            pro_img1: rasm[0].filename,
            pro_img2: rasm[1].filename,
        })
            .returning("*")
            .execute();
        const cache = await client.get("allProduct");
        if (cache) {
            await client.set("allProduct", JSON.stringify([...JSON.parse(cache), newProduct.raw[0]]));
        }
        res.json({
            message: "Create",
            status: 201,
            data: newProduct.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const PUT = async (req, res, next) => {
    try {
        const { name, price, razmer, gender, after, madeIn, language, subId } = req.result;
        const { id } = req.params;
        const rasm = req.files;
        const client = await (0, config_1.fetchRedis)();
        const findProduct = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).findOneBy({ pro_id: id });
        if (findProduct) {
            const updateProduct = await ormconfig_1.dataSourse
                .getRepository(product_entite_1.Product)
                .createQueryBuilder()
                .update()
                .set({
                pro_name: name || findProduct.pro_name,
                pro_price: price || findProduct.pro_price,
                pro_razmer: razmer || findProduct.pro_razmer,
                pro_pol: gender ? (gender === "Erkaklar uchun" ? true : false) : findProduct.pro_pol,
                pro_after: after || findProduct.pro_after,
                pro_in: madeIn || findProduct.pro_in,
                pro_langu: language || findProduct.pro_langu,
                pro_sub: subId || findProduct.pro_sub,
                pro_img1: rasm[0]?.filename || findProduct.pro_img1,
                pro_img2: rasm[1]?.filename || findProduct.pro_img2,
            })
                .where({ pro_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allProduct");
            if (cache) {
                const all = JSON.parse(cache);
                const update = all.map((e) => (e.pro_id === id ? updateProduct.raw[0] : e));
                await client.set("allProduct", JSON.stringify(update));
            }
            res.json({
                message: "Update",
                status: 200,
                data: updateProduct.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Product Not Found", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.PUT = PUT;
const DELETE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await (0, config_1.fetchRedis)();
        const findProduct = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).findOneBy({ pro_id: id });
        if (findProduct) {
            const deleteProduct = await ormconfig_1.dataSourse
                .getRepository(product_entite_1.Product)
                .createQueryBuilder()
                .delete()
                .from(product_entite_1.Product)
                .where({ pro_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allProduct");
            if (cache) {
                const all = JSON.parse(cache);
                const deleted = all.filter((e) => e.pro_id !== id);
                await client.set("allProduct", JSON.stringify(deleted));
            }
            res.json({
                message: "Delete",
                status: 204,
                data: deleteProduct.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Product Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
const SERACH = async (req, res, next) => {
    try {
        const { proName } = req.params;
        const allProduct = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).find();
        const searchProduct = allProduct.filter((e) => e.pro_name.split("").includes(proName));
        res.json({
            message: "OK",
            status: 200,
            data: searchProduct,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.SERACH = SERACH;
