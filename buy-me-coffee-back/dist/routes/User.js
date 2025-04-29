"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const User_1 = require("../controller/User");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/", User_1.createProfile);
userRouter.get("/:id", User_1.getUserProfile);
//# sourceMappingURL=User.js.map