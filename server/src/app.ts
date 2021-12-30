import * as dotenv from "dotenv";
import express from "express";
import * as swaggerUi from "swagger-ui-express";

import swaggerSpec from "../swagger.json";

dotenv.config();

export const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
