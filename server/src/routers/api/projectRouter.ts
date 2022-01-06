import { Router } from "express";
import {
    addColumn,
    createProject,
    deleteProject,
    editProject,
    getAllProjects,
    getProjectColumns,
    reorderColumn,
} from "../../controllers/projectController";

const projectRouter = Router();

projectRouter.get("/", getAllProjects);
projectRouter.post("/create", createProject);
projectRouter.put("/edit/:id", editProject);
projectRouter.delete("/delete/:id", deleteProject);
projectRouter.post("/add-column/:id", addColumn);
projectRouter.get("/columns/:id", getProjectColumns);
projectRouter.put("/reorder-column/:id", reorderColumn);

export { projectRouter };
