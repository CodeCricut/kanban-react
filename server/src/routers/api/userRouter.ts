import { Router } from "express";
import {
    getLoggedInUser,
    getUserProjects,
} from "../../controllers/userController";
import { auth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/me", auth, getLoggedInUser);
userRouter.get("/me/projects", auth, getUserProjects);

export { userRouter };
