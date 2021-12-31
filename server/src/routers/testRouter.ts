import { Router } from "express";
import { TestController } from "../controllers/testController";

export const makeTestRouter = (testController: TestController) => {
    const router = Router();

    router.get("/", testController.testHandler);

    return router;
};
