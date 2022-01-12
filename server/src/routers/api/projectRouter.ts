import { Router } from "express";
import {
    addColumn,
    createProject,
    deleteProject,
    editProject,
    getProjectColumns,
    reorderColumn,
} from "../../controllers/projectController";
import { auth } from "../middleware/auth";

const projectRouter = Router();

projectRouter.post("/create", auth, createProject);
projectRouter.put("/edit/:id", editProject);
projectRouter.delete("/delete/:id", deleteProject);
projectRouter.post("/add-column/:id", addColumn);
projectRouter.get("/columns/:id", getProjectColumns);
projectRouter.put("/reorder-column/:id", reorderColumn);

export { projectRouter };
