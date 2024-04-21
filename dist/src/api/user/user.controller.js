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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../config/prisma");
const user_schema_js_1 = __importDefault(require("./user.schema.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const secrete_1 = require("../../config/secrete");
const usersController = {
    loginUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            user_schema_js_1.default.login.parse(req.body);
            console.log(req.body);
            const user = yield prisma_1.prisma.user.findFirst({
                where: { username: req.body.username },
            });
            if (!user) {
                return res.status(401).json({
                    message: "Invalid username or password",
                });
            }
            const isMatch = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid username or password",
                });
            }
            const userProfile = yield prisma_1.prisma.profile.findFirst({
                where: { user_id: user.id },
            });
            // Create token
            const payload = {
                id: user.id,
                role: user.role,
                firstName: userProfile === null || userProfile === void 0 ? void 0 : userProfile.firstname,
            };
            const token = jsonwebtoken_1.default.sign(payload, secrete_1.SECRET);
            return res.status(200).json({
                token,
                message: "Login successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = usersController;
