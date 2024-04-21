"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = __importDefault(require("./src/route/"));
const secrete_1 = require("./src/config/secrete");
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use(route_1.default);
// app.get('/',async (req: Request,res: Response)=>{
//   const admin = await prisma.admins.
// })
// Start the server
app.listen(secrete_1.PORT, () => {
    console.log(`Server listening on port ${secrete_1.PORT}`);
});
