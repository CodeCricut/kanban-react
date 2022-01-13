import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../application/errors";

export type InvalidResponse = {
    statusCode: string;
    message: string;
};

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ApplicationError) {
        console.warn(error.message);
        res.status(error.statusCode);
        const response: InvalidResponse = {
            message: error.message,
            statusCode: error.name,
        };
        return res.json(response);
    } else {
        console.error(error.message);
        res.status(500);
        const response: InvalidResponse = {
            statusCode: error.name,
            message: error.message,
        };
        return res.json(response);
    }
}
