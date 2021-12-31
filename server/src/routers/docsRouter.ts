import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../swagger.json";

export const makeDocsRouter = () => {
    const router = Router();

    router.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return router;
};
