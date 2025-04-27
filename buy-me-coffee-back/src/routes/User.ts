import { Router } from "express";
import { signUp, refresh, getUser, updateUser } from "../controller/User";

const authRouter = Router();

authRouter.post("/", signUp)

authRouter.get("/:id", getUser)

authRouter.patch("/:id", updateUser)


export {
    authRouter
}