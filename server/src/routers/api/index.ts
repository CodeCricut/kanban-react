import { Router } from "express";
import morgan from "morgan";
import { columnRouter } from "./columnRouter";
import { errorHandler } from "./errorHandler";
import { projectRouter } from "./projectRouter";

const apiRouter = Router();

apiRouter.use(morgan("dev"));
apiRouter.use("/projects", projectRouter);
apiRouter.use("/columns", columnRouter);
apiRouter.use(errorHandler);

export { apiRouter };
