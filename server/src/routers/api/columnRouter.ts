import { Router } from "express";
import {
    addIssue,
    deleteColumn,
    editColumn,
    getColumnIssues,
} from "../../controllers/columnController";

const columnRouter = Router();

columnRouter.put("/edit/:id", editColumn);
columnRouter.delete("/delete/:id", deleteColumn);
columnRouter.post("/add-issue/:id", addIssue);
columnRouter.get("/issues/:id", getColumnIssues);

export { columnRouter };
