"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const newsSchema = {
    //register admin
    createnew: zod_1.z.object({
        title: zod_1.z.string(),
        publication_date: zod_1.z.date(),
        description: zod_1.z.string(),
        image_url: zod_1.z.string()
    }),
};
exports.default = newsSchema;
