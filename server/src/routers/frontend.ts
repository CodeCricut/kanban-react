import express, { Router, Request, Response } from "express";

import { config } from "../../config";

const frontendRouter = Router();

// This could go in a controller, but it is so simple that I don't think it warrants it
frontendRouter.use(express.static(config.frontendBuildPath));
frontendRouter.get("*", (req: Request, res: Response) => {
    res.sendFile(config.frontendIndexPath);
});

export { frontendRouter };
