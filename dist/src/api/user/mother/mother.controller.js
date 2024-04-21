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
const mother_schema_js_1 = __importDefault(require("./mother.schema.js"));
const prisma_js_1 = require("../../../config/prisma.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const motherController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        mother_schema_js_1.default.registerMother.parse(req.body);
        //check if the employye exist before
        const isMotherExist = yield prisma_js_1.prisma.user.findFirst({ where: {
                OR: [
                    { username: req.body.email },
                    { phonenumber: req.body.phone }
                ]
            } });
        req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
        //create the employee
        const newMother = yield prisma_js_1.prisma.mother.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                phonenumber: req.body.phone,
                role: "MOTHER",
                date_of_birth: req.body.date_of_birth,
                address: req.body.address,
            },
        });
    })
};
exports.default = motherController;
