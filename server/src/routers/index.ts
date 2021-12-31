import { Router } from "express";

export const makeApiRouter = (projectRouter: Router, docRouter: Router) => {
    const apiRouter = Router();

    apiRouter.use("/projects", projectRouter);
    apiRouter.use("/docs", docRouter);

    return apiRouter;
};
