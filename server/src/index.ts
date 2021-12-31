import { makeApp, startApp } from "./app";
import { AppDependencies, getAppDependencies } from "./dependencies";
import { config } from "../config";

const dependencies: AppDependencies = getAppDependencies(config);

// Start the app if the database was started
dependencies.database
    .initDatabase()
    .then(() => {
        const app = makeApp(
            dependencies.apiRouter,
            dependencies.frontendRouter,
            dependencies.docRouter
        );
        startApp(app);
    })
    .catch((e) => {
        if (e instanceof Error) {
            console.error(`Couldn't start database. ${e.message}`);
        } else {
            console.error("Critical error: couldn't start database");
        }
    });
