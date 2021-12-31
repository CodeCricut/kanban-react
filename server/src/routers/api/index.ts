import { Router } from "express";

export const makeApiRouter = (projectRouter: Router) => {
    const apiRouter = Router();

    apiRouter.use("/projects", projectRouter);

    return apiRouter;
};
