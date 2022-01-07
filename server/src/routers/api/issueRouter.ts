import { Router } from "express";
import { editIssue } from "../../controllers/issueController";

const issueRouter = Router();

issueRouter.put("/edit/:id", editIssue);

export { issueRouter };
