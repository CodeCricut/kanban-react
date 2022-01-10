import { NextFunction, Request, Response } from "express";
import { handleGetLoggedInUserQuery } from "../application/queries/getLoggedInUser";

export async function getLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new Error("User not defined for request.");
        const privateUser = await handleGetLoggedInUserQuery(req.user);
        res.status(200).json(privateUser);
    } catch (e: any) {
        next(e);
    }
}
