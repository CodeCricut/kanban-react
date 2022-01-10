import { NextFunction, Request, Response } from "express";

import { handleRegisterUserCommand } from "../application/commands/registerUser";

export async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { username, email, password } = req.body;
        const jwt = await handleRegisterUserCommand({
            username,
            email,
            password,
        });
        res.status(200).json({ jwt });
    } catch (e: any) {
        next(e);
    }
}
