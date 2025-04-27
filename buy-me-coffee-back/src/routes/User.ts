import { Router } from "express";
import { createProfile, getUserProfile } from "../controller/User";

const userRouter = Router();

userRouter.post("/", createProfile)

userRouter.get("/:id", getUserProfile)


export {
    userRouter
}