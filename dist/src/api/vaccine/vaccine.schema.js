"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const vaccineSchema = {
    register: zod_1.z.object({
        v_name: zod_1.z.string(),
        description: zod_1.z.string(),
        ageRange: zod_1.z.string(),
    }),
};
exports.default = vaccineSchema;
