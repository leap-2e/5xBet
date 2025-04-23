import { Router } from "express";
import { createUser } from "../controller/User";

const authRouter = Router();

authRouter.post("/", createUser)

export {
    authRouter
}