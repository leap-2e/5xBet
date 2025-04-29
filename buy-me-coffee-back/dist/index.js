"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_1 = require("./routes/Auth");
const User_1 = require("./routes/User");
// import { client } from './utils/connection';
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use("/hello", (_req, res) => {
    res.json({ message: "Hello World" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use("/auth", Auth_1.authRouter);
app.use("/profile", User_1.userRouter);
//# sourceMappingURL=index.js.map