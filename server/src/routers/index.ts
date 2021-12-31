import { Router } from "express";

export const makeApiRouter = (testRouter: Router, docRouter: Router) => {
    const apiRouter = Router();

    apiRouter.use("/test", testRouter);
    apiRouter.use("/docs", docRouter);

    return apiRouter;
};
