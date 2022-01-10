import { Router } from "express";
import { getLoggedInUser } from "../../controllers/userController";
import { auth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/me", auth, getLoggedInUser);

export { userRouter };
