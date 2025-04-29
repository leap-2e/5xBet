"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const Auth_1 = require("../controller/Auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/", Auth_1.signUp);
authRouter.get("/:id", Auth_1.getUser);
authRouter.patch("/:id", Auth_1.updateUser);
//# sourceMappingURL=Auth.js.map