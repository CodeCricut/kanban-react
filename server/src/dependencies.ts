import { Router } from "express";
import { TestController } from "./controllers/testController";
import { makeApiRouter } from "./routers";
import { makeDocsRouter } from "./routers/docsRouter";
import { makeTestRouter } from "./routers/testRouter";

export type AppDependencies = {
    testController: TestController;
    testRouter: Router;
    docRouter: Router;
    apiRouter: Router;
};

export function getAppDependencies(): AppDependencies {
    const testController = new TestController();

    const testRouter = makeTestRouter(testController);
    const docRouter = makeDocsRouter();

    const apiRouter: Router = makeApiRouter(testRouter, docRouter);

    return {
        testController,
        testRouter,
        docRouter,
        apiRouter,
    };
}
