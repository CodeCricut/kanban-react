import { makeApp, startApp } from "./app";
import { AppDependencies, getAppDependencies } from "./dependencies";

const dependencies: AppDependencies = getAppDependencies();

const app = makeApp(dependencies.apiRouter);
startApp(app);
