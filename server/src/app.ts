import express, { Express } from "express";

import * as dotenv from "dotenv";
import cors from "cors";
import { frontendRouter } from "./routers/frontend";
import { docsRouter } from "./routers/docsRouter";
import { apiRouter } from "./routers/api";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", docsRouter);
app.use("/api", apiRouter);
app.use("/", frontendRouter);

/**
 * Begin the server on the port defined by the PORT or TEST_PORT environment variable.
 */
function startApp(app: Express) {
    const port = process.env.PORT || process.env.TEST_PORT;
    if (!port)
        throw new Error(
            "Tried starting app without defining PORT or TEST_PORT environment variable."
        );

    app.listen(port, () =>
        console.log(`Listening at http://localhost:${port}`)
    );
}

export { app, startApp };
