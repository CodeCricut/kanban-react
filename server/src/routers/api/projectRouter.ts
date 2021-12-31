import { Router } from "express";
import { ProjectController } from "../../controllers/projectController";

export const makeProjectRouter = (projectController: ProjectController) => {
    const router = Router();

    router.post("/create", projectController.createProject);

    return router;
};
