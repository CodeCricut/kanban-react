import express, { Express, Router } from "express";

import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

export function makeApp(
    apiRouter: Router,
    frontendRouter: Router,
    docsRouter: Router
) {
    app.use(cors());
    app.use(express.json());
    app.use("/api", apiRouter);
    app.use("/docs", docsRouter);
    app.use("/", frontendRouter);
    return app;
}

export function startApp(app: Express) {
    const port = process.env.PORT || process.env.TEST_PORT;
    if (!port)
        throw new Error(
            "Tried starting app without defining PORT or TEST_PORT environment variable."
        );

    app.listen(port, () =>
        console.log(`Listening at http://localhost:${port}`)
    );
}
