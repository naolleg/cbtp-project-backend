"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const vaccine_schema_js_1 = __importDefault(require("./vaccine.schema.js"));
const prisma = new client_1.PrismaClient();
const vaccineController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            vaccine_schema_js_1.default.register.parse(req.body);
            // Check if the vaccine already exists
            const vaccine = yield prisma.vaccine.findFirst({
                where: {
                    OR: [
                        { v_name: req.body.v_name },
                    ]
                }
            });
            if (vaccine) {
                return res.status(401).json({
                    message: "vaccine already exists"
                });
            }
            const newVaccine = yield prisma.vaccine.create({ data: req.body });
            res.status(200).json(newVaccine);
        }
        catch (error) {
            next(error);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vaccines = yield prisma.vaccine.findMany();
            res.status(200).json(vaccines);
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = vaccineController;
