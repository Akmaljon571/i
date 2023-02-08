"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = async () => {
    const client = await (0, config_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheProduct = await client.get("allProduct");
            const allProduct = JSON.parse(cacheProduct);
            if (allProduct && allProduct.length) {
                await client.del("allProduct");
            }
        }, config_1.SEKUND);
    }
};
