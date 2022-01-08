import { NextFunction, Request, Response } from "express";
import { handleDeleteIssueCommand } from "../application/commands/deleteIssue";
import { handleEditIssueCommand } from "../application/commands/editIssue";
import { handleRelocateIssueCommand } from "../application/commands/relocateIssue";

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
            return res.json(updated);
        })
        .catch(next);
}

export async function deleteIssue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleDeleteIssueCommand({
        id: req.params.id,
        columnId: req.query.columnId as string,
    })
        .then(() => {
            res.status(200);
            return res.json();
        })
        .catch(next);
}

export async function relocateIssue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { oldColumnId, newColumnId, newIndex } = req.body;
        const updatedColumn = await handleRelocateIssueCommand({
            issueId: req.params.id,
            newColumnId,
            oldColumnId,
            newIndex,
        });
        res.status(200);
        return res.json(updatedColumn);
    } catch (e: any) {
        next(e);
    }
}
