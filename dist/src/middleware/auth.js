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
exports.isEmployee = exports.isMother = exports.isReception = exports.isHealthProfetional = exports.isManager = exports.isAdmin = exports.isSuperAdmin = exports.userAuth = exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrete_js_1 = require("../config/secrete.js");
const prisma_js_1 = require("../config/prisma.js");
const client_1 = require("@prisma/client");
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return next(new UnprocessableEntity('Token not found', 404, ErrorCode.TOKEN_NOT_FOUND, null));
    }
    try {
        const payload = yield jsonwebtoken_1.default.verify(token, secrete_js_1.SECRET);
        const admin = yield prisma_js_1.prisma.admins.findUnique({
            where: {
                id: (payload).id
            }
        });
        if (!admin) {
            return next(new NotFound('user not found', 404, ErrorCode.USER_NOT_FOUND, null));
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        return next(new UnprocessableEntity('invalide token', 404, ErrorCode.TOKEN_NOT_FOUND, null));
    }
});
exports.adminAuth = adminAuth;
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const token = req.headers.authorization;
    if (!token) {
        return next(new UnprocessableEntity('Token not found', 404, ErrorCode.TOKEN_NOT_FOUND, null));
    }
    try {
        const payload = yield jsonwebtoken_1.default.verify(token, secrete_js_1.SECRET);
        const user = yield prisma_js_1.prisma.users.findFirst({
            where: {
                id: payload.id
            }
        });
        if (!user) {
            return next(new NotFound('User not found', 404, ErrorCode.USER_NOT_FOUND, null));
        }
        req.user = user;
        // console.log(req.user);
        next();
    }
    catch (error) {
        return next(new UnprocessableEntity('Invalid token', 404, ErrorCode.TOKEN_NOT_FOUND, null));
    }
});
exports.userAuth = userAuth;
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.admin;
    if (admin && admin.role !== client_1.AdminRole.SUPER) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isSuperAdmin = isSuperAdmin;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.admin;
    if (admin && admin.role !== client_1.AdminRole.ADMIN) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isAdmin = isAdmin;
const isHealthProfetional = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role !== client_1.UserRole.HEALTH_PROFETIONAL) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isHealthProfetional = isHealthProfetional;
const isManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role !== client_1.UserRole.MANAGER) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isManager = isManager;
const isReception = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role !== client_1.UserRole.RECEPTION) {
        return next(new Unauthorized('user not reception', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isReception = isReception;
const isMother = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role !== client_1.UserRole.MOTHER) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isMother = isMother;
const isEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role === client_1.UserRole.MOTHER) {
        return next(new Unauthorized('user not admin', 401, ErrorCode.USER_NOT_FOUND, null));
    }
    next();
});
exports.isEmployee = isEmployee;
