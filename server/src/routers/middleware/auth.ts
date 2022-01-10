import { NextFunction, Request, Response } from "express";
import { decodeUserJwt } from "../../services/jwt";

export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        req.user = decodeUserJwt(token);
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid authentication Token" });
    }
}
