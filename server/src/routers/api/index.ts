import { Router } from "express";
import morgan from "morgan";
import { authRouter } from "./authRouter";
import { errorHandler } from "../middleware/errorHandler";
import { projectRouter } from "./projectRouter";
import { userRouter } from "./userRouter";

const apiRouter = Router();

apiRouter.use(morgan("dev"));
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use(errorHandler);

export { apiRouter };
