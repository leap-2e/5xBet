import { Router } from "express";
import { GET } from "../controller/Auth";
// import { signUp, getUser, updateUser } from "../controller/Auth";

const authRouter = Router();

authRouter.get("/", GET)

// authRouter.get("/:id", getUser)

// authRouter.patch("/:id", updateUser)


export {
    authRouter
}