import { Router } from "express";
import { addColumn, createProject } from "../../controllers/projectController";
import { auth } from "../middleware/auth";

const projectRouter = Router();

projectRouter.post("/create", auth, createProject);
projectRouter.post("/add-column/:id", auth, addColumn);

// projectRouter.put("/edit/:id", editProject);
// projectRouter.delete("/delete/:id", deleteProject);
// projectRouter.put("/reorder-column/:id", reorderColumn);

export { projectRouter };
