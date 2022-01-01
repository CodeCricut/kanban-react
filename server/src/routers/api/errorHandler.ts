import { NextFunction, Request, Response } from "express";

export type InvalidResponse = {
    statusCode: string;
    message: string;
};

export function errorHandler(
    e: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (e instanceof Error) {
        res.status(400);
        const response: InvalidResponse = {
            statusCode: e.name,
            message: e.message,
        };
        return res.json(response);
    } else {
        const response: InvalidResponse = {
            statusCode: "UH_OH",
            message: `Fatal error; expected error to be handled, got ${JSON.stringify(
                e
            )}`,
        };
        return res.json(response);
    }
}
