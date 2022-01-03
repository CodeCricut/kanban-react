import { Router } from "express";
import { ProjectController } from "../../controllers/projectController";

export const makeProjectRouter = (projectController: ProjectController) => {
    const router = Router();

    router.get("/", projectController.getAllProjects);
    router.post("/create", projectController.createProject);
    router.put("/edit/:id", projectController.editProject);
    router.delete("/delete/:id", projectController.deleteProject);
    router.post("/add-column/:id", projectController.addColumn);

    router.get("/columns/:id", projectController.getProjectColumns);

    return router;
};
