import { Router } from "express";
import { check } from "express-validator";
import { registerUser } from "../../controllers/authController";

const authRouter = Router();

authRouter.post(
    "/register",
    // TODO: while these request validators are nice, they should not replace checks in the command handlers. Add validation to command handlers
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        check("email", "Please enter a valid email.").isEmail(),
        check("password", "Please enter a valid password.").isLength({
            min: 6,
        }),
    ],
    registerUser
);

export { authRouter };
