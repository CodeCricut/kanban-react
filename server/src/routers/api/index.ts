import { Router } from "express";
import morgan from "morgan";

export const makeApiRouter = (projectRouter: Router) => {
    const apiRouter = Router();

    apiRouter.use(morgan("dev"));
    apiRouter.use("/projects", projectRouter);

    return apiRouter;
};
