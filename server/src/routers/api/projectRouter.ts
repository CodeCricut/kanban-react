import { Router } from "express";
import {
    addColumn,
    addIssue,
    createProject,
    deleteProject,
    editColumn,
    editProject,
} from "../../controllers/projectController";
import { auth } from "../middleware/auth";

const projectRouter = Router();

projectRouter.post("/create", auth, createProject);
projectRouter.put("/edit/:id", auth, editProject);
projectRouter.delete("/delete/:id", auth, deleteProject);

projectRouter.post("/add-column/:id", auth, addColumn);
projectRouter.put("/edit-column/:id", auth, editColumn);

projectRouter.post("/add-issue/:id", auth, addIssue);

export { projectRouter };
