import { Router } from "express";
import morgan from "morgan";
import { errorHandler } from "./errorHandler";

export const makeApiRouter = (projectRouter: Router, columnRouter: Router) => {
    const apiRouter = Router();

    apiRouter.use(morgan("dev"));
    apiRouter.use("/projects", projectRouter);
    apiRouter.use("/columns", columnRouter);
    apiRouter.use(errorHandler);

    return apiRouter;
};
