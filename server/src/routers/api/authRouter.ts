import { Router } from "express";
import { check } from "express-validator";
import { login, registerUser } from "../../controllers/authController";

const authRouter = Router();

authRouter.post(
    "/register",
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        check("email", "Please enter a valid email.").isEmail(),
        check("password", "Please enter a valid password.").isLength({
            min: 6,
        }),
    ],
    registerUser
);

authRouter.post(
    "/login",
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        check("password", "Please enter a valid password.").isLength({
            min: 6,
        }),
    ],
    login
);

export { authRouter };
