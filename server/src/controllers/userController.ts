import { NextFunction, Request, Response } from "express";
import { handleGetLoggedInUserQuery } from "../application/queries/getLoggedInUser";
import { handleGetUserProjects } from "../application/queries/getUsersProjects";
import { NotAuthenticatedError } from "./errors";

export async function getLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();
        const privateUser = await handleGetLoggedInUserQuery(req.user);
        res.status(200).json(privateUser);
    } catch (e: any) {
        next(e);
    }
}

export async function getUserProjects(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();
        const projects = await handleGetUserProjects({ userId: req.user.id });
        res.status(200).json(projects);
    } catch (e: any) {
        next(e);
    }
}
