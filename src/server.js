"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const main = async () => {
    try {
        await config_1.dataSourse.initialize();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        config_1.app.listen(config_1.PORT, () => console.log("Server run 🚀 in: " + config_1.PORT));
    }
};
main();
