import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../swagger.json";

const docsRouter = Router();

docsRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { docsRouter };
