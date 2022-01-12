import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../docs/api/swagger";

const docsRouter = Router();

docsRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { docsRouter };
