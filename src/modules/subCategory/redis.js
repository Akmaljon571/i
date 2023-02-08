"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = async () => {
    const client = await (0, config_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheSubCategory = await client.get("allSubCategory");
            const allSubCategory = JSON.parse(cacheSubCategory);
            if (allSubCategory && allSubCategory.length) {
                await client.del("allSubCategory");
            }
        }, config_1.SEKUND);
    }
};
