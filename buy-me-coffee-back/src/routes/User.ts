import { Router } from "express";
import { signUp, refresh, getUser } from "../controller/User";

const authRouter = Router();

authRouter.post("/", signUp)

authRouter.get("/:id", getUser)

export {
    authRouter
}