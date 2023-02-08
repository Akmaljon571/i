"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byProduct = exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const config_1 = require("../../config");
const subcategory_entite_1 = require("../../entities/subcategory.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const redis_1 = __importDefault(require("./redis"));
const GET = async (req, res, next) => {
    try {
        const client = await (0, config_1.fetchRedis)();
        const cache = await client.get("allSubCategory");
        await (0, redis_1.default)();
        if (!cache) {
            const allSubCategory = await config_1.dataSourse.getRepository(subcategory_entite_1.subCategory).find();
            await client.set("allSubCategory", JSON.stringify(allSubCategory));
            res.json({
                message: "OK",
                status: 200,
                data: allSubCategory,
            });
        }
        else {
            const allSubCategory = JSON.parse(cache);
            res.json({
                message: "OK",
                status: 200,
                data: allSubCategory,
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
        const { title, categoryId } = req.result;
        const client = await (0, config_1.fetchRedis)();
        const newSubCategory = await config_1.dataSourse
            .getRepository(subcategory_entite_1.subCategory)
            .createQueryBuilder()
            .insert()
            .into(subcategory_entite_1.subCategory)
            .values({ sub_title: title, sub_cat: categoryId })
            .returning("*")
            .execute();
        const cache = await client.get("allSubCategory");
        if (cache) {
            await client.set("allSubCategory", JSON.stringify([...JSON.parse(cache), newSubCategory.raw[0]]));
        }
        res.json({
            message: "Create",
            status: 200,
            data: newSubCategory.raw[0],
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
        const { title, categoryId } = req.result;
        const { id } = req.params;
        const client = await (0, config_1.fetchRedis)();
        const findSubCategory = await config_1.dataSourse.getRepository(subcategory_entite_1.subCategory).findOneBy({ sub_id: String(id) });
        if (findSubCategory) {
            const updateSubCategory = await config_1.dataSourse
                .getRepository(subcategory_entite_1.subCategory)
                .createQueryBuilder()
                .update()
                .set({ sub_title: title || findSubCategory.sub_title, sub_cat: categoryId || findSubCategory.sub_cat })
                .where({ sub_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allSubCategory");
            if (cache) {
                const all = JSON.parse(cache);
                const update = all.map((e) => (e.sub_id === id ? updateSubCategory.raw[0] : e));
                await client.set("allSubCategory", JSON.stringify(update));
            }
            res.json({
                message: "Update",
                status: 200,
                data: updateSubCategory.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("SubCategory Not Found", 400);
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
        const findSubCategory = await config_1.dataSourse.getRepository(subcategory_entite_1.subCategory).findOneBy({ sub_id: id });
        if (findSubCategory) {
            const deleteSubCategory = await config_1.dataSourse
                .getRepository(subcategory_entite_1.subCategory)
                .createQueryBuilder()
                .delete()
                .from(subcategory_entite_1.subCategory)
                .where({ sub_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allSubCategory");
            if (cache) {
                const all = JSON.parse(cache);
                const deleted = all.filter((e) => e.sub_id !== id);
                await client.set("allSubCategory", JSON.stringify(deleted));
            }
            res.json({
                message: "Delete",
                status: 200,
                data: deleteSubCategory.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("SubCategory Not Found", 400);
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
        const byProduct = await config_1.dataSourse.getRepository(subcategory_entite_1.subCategory).findOne({
            relations: {
                sub_product: true,
            },
            where: {
                sub_id: id,
            },
        });
        res.json({
            message: "Ok",
            status: 200,
            data: byProduct,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.byProduct = byProduct;
