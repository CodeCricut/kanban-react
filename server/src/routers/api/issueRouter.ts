import { Router } from "express";
import { deleteIssue, editIssue } from "../../controllers/issueController";

const issueRouter = Router();

issueRouter.put("/edit/:id", editIssue);
issueRouter.delete("/delete/:id", deleteIssue);

export { issueRouter };
