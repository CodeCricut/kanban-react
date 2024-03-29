import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { handleLoginCommand } from "../application/commands/login";

import { handleRegisterUserCommand } from "../application/commands/registerUser";

export async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
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

export async function login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        const { username, password } = req.body;
        const jwt = await handleLoginCommand({
            username,
            password,
        });
        res.status(200).json({ jwt });
    } catch (e: any) {
        next(e);
    }
}
