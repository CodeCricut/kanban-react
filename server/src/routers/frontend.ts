import express, { Router, Request, Response } from "express";

import { Config } from "../../config";

export const makeFrontendRouter = (config: Config) => {
    const router = Router();

    // This could go in a controller, but it is so simple that I don't think it warrants it
    router.use(express.static(config.frontendBuildPath));
    router.get("/", (req: Request, res: Response) => {
        res.sendFile(config.frontendIndexPath);
    });

    return router;
};
