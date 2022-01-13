import { NextFunction, Request, Response } from "express";
import { handleAddColumnToProjectCommand } from "../application/commands/addColumnToProject";
import { handleAddIssueToColumnCommand } from "../application/commands/addIssueToColumn";
import { handleCreateProjectCommand } from "../application/commands/createProject";
import { handleDeleteProjectCommand } from "../application/commands/deleteProject";
import { handleEditColumnCommand } from "../application/commands/editColumn";
import { handleEditIssueCommand } from "../application/commands/editIssue";
import { handleEditProjectCommand } from "../application/commands/editProject";
import { NotAuthenticatedError } from "../application/errors";

export async function createProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();
        const { name, description } = req.body;
        const created = await handleCreateProjectCommand({
            name,
            description,
            userId: req.user.id,
        });

        res.status(200);
        return res.json(created);
    } catch (e: any) {
        next(e);
    }
}

export async function addColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();

        const { columnIndex, name, description } = req.body;
        const updatedProject = await handleAddColumnToProjectCommand({
            userId: req.user.id,
            projectId: req.params.id,
            columnIndex,
            name,
            description,
        });

        res.status(200);
        return res.json(updatedProject);
    } catch (e: any) {
        next(e);
    }
}

export async function addIssue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();

        const { columnId, issueIndex, name, description } = req.body;
        const updatedProject = await handleAddIssueToColumnCommand({
            userId: req.user.id,
            projectId: req.params.id,
            columnId,
            issueIndex,
            name,
            description,
        });

        res.status(200);
        return res.json(updatedProject);
    } catch (e: any) {
        next(e);
    }
}

export async function editProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();

        const { name, description } = req.body;
        const updated = await handleEditProjectCommand({
            id: req.params.id,
            name,
            description,
            userId: req.user.id,
        });

        res.status(200);
        return res.json(updated);
    } catch (e: any) {
        next(e);
    }
}

export async function editColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();

        const { columnId, name, description } = req.body;
        const updated = await handleEditColumnCommand({
            userId: req.user.id,
            projectId: req.params.id,
            columnId: columnId,
            name,
            description,
        });

        res.status(200);
        return res.json(updated);
    } catch (e: any) {
        next(e);
    }
}

export async function editissue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();

        const { issueId, name, description } = req.body;
        const updated = await handleEditIssueCommand({
            userId: req.user.id,
            projectId: req.params.id,
            issueId,
            name,
            description,
        });

        res.status(200);
        return res.json(updated);
    } catch (e: any) {
        next(e);
    }
}

export async function deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) throw new NotAuthenticatedError();
        await handleDeleteProjectCommand({
            id: req.params.id,
            userId: req.user.id,
        });
        return res.status(200).json();
    } catch (e: any) {
        next(e);
    }
}
