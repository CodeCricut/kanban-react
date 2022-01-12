import { Router } from "express";
import morgan from "morgan";
import { authRouter } from "./authRouter";
import { columnRouter } from "./columnRouter";
import { errorHandler } from "../middleware/errorHandler";
import { issueRouter } from "./issueRouter";
import { projectRouter } from "./projectRouter";
import { userRouter } from "./userRouter";

const apiRouter = Router();

apiRouter.use(morgan("dev"));
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/columns", columnRouter);
apiRouter.use("/issues", issueRouter);
apiRouter.use(errorHandler);

export { apiRouter };
