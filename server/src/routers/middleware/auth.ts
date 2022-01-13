import { NextFunction, Request, Response } from "express";
import {
    InvalidTokenError,
    NotAuthenticatedError,
} from "../../application/errors";
import { decodeUserJwt } from "../../services/jwt";

/**
 * Express middleware which will attatch a user object to the request if
 * a valid jwt token header was provided.
 */
export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header("token");
    if (!token) {
        const error = new NotAuthenticatedError(
            "Missing jwt in 'token' header."
        );
        return next(error);
    }

    try {
        req.user = decodeUserJwt(token);
        next();
    } catch (e) {
        return next(new InvalidTokenError());
    }
}
