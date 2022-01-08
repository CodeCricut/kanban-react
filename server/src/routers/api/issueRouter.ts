import { Router } from "express";
import {
    deleteIssue,
    editIssue,
    relocateIssue,
} from "../../controllers/issueController";

const issueRouter = Router();

issueRouter.put("/edit/:id", editIssue);
issueRouter.delete("/delete/:id", deleteIssue);
issueRouter.put("/relocate/:id", relocateIssue);

export { issueRouter };
