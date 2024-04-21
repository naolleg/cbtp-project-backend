"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const vaccineSchema = {
    register: zod_1.default.object({
        v_name: zod_1.default.string(),
    })
};
exports.default = vaccineSchema;
