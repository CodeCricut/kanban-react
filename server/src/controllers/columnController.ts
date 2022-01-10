import { NextFunction, Request, Response } from "express";
import { handleAddIssueToColumnCommand } from "../application/commands/addIssueToColumn";
import { handleDeleteColumnCommand } from "../application/commands/deleteColumn";
import { handleEditColumnCommand } from "../application/commands/editColumn";
import { handleGetColumnsIssuesQuery } from "../application/queries/getColumnsIssues";

export async function editColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleEditColumnCommand({
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

export async function deleteColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleDeleteColumnCommand({
        id: req.params.id,
        projectId: req.query.projectId as string,
    })
        .then((updated) => {
            res.status(200);
            return res.json(updated);
        })
        .catch(next);
}

export async function addIssue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { issueIndex, name, description, createdAt } = req.body;
        const updatedColumn = await handleAddIssueToColumnCommand({
            columnId: req.params.id,
            issueIndex,
            name,
            description,
            createdAt,
        });

        res.status(200);
        return res.json(updatedColumn);
    } catch (e: any) {
        next(e);
    }
}

export async function getColumnIssues(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleGetColumnsIssuesQuery({
        columnId: req.params.id,
    })
        .then((issues) => {
            res.status(200);
            return res.json(issues);
        })
        .catch(next);
}
