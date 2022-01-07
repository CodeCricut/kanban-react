import { NextFunction, Request, Response } from "express";
import { handleEditIssueCommand } from "../application/commands/editIssue";

export async function editIssue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleEditIssueCommand({
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
    })
        .then((updated) => {
            res.status(200);
            res.json(updated);
        })
        .catch(next);
}
