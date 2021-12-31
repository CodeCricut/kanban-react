import { makeApp, startApp } from "./app";
import { AppDependencies, getAppDependencies } from "./dependencies";
import { config } from "../config";

const dependencies: AppDependencies = getAppDependencies(config);

const app = makeApp(
    dependencies.apiRouter,
    dependencies.frontendRouter,
    dependencies.docRouter
);
startApp(app);
