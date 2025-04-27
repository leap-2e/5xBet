import { Router } from "express";
import { signUp, getUser, updateUser } from "../controller/Auth";

const authRouter = Router();

authRouter.post("/", signUp)

authRouter.get("/:id", getUser)

authRouter.patch("/:id", updateUser)


export {
    authRouter
}