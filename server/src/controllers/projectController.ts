import { NextFunction, Request, Response } from "express";
import { handleAddColumnToProjectCommand } from "../application/commands/addColumnToProject";
import { handleCreateProjectCommand } from "../application/commands/createProject";
import { handleDeleteProjectCommand } from "../application/commands/deleteProject";
import { handleEditProjectCommand } from "../application/commands/editProject";
import { handleReorderColumnsCommand } from "../application/commands/reorderColumn";
import { handleGetAllProjectsQuery } from "../application/queries/getAllProjects";
import { handleGetProjectsColumnsQuery } from "../application/queries/getProjectsColumns";

export async function createProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, createdAt, description } = req.body;
        const created = await handleCreateProjectCommand({
            name,
            createdAt,
            description,
        });

        res.status(200);
        return res.json(created);
    } catch (e: any) {
        next(e);
    }
}

export async function getAllProjects(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleGetAllProjectsQuery()
        .then((allProjects) => {
            res.status(200);
            return res.json(allProjects);
        })
        .catch(next);
}

export async function editProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, description } = req.body;
        const updated = await handleEditProjectCommand({
            id: req.params.id,
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
    return handleDeleteProjectCommand({
        id: req.params.id,
    })
        .then(() => {
            res.status(200);
            return res.send();
        })
        .catch(next);
}

export async function addColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { columnIndex, name, description, createdAt } = req.body;
        const updatedProject = await handleAddColumnToProjectCommand({
            projectId: req.params.id,
            columnIndex,
            name,
            description,
            createdAt,
        });

        res.status(200);
        return res.json(updatedProject);
    } catch (e: any) {
        next(e);
    }
}

export async function getProjectColumns(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return handleGetProjectsColumnsQuery({
        projectId: req.params.id,
    })
        .then((columns) => {
            res.status(200);
            return res.json(columns);
        })
        .catch(next);
}

export async function reorderColumn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const columnId: string = req.query.columnId as string;
        const newIndex: number = Number(req.query.newIndex);
        const updatedProject = await handleReorderColumnsCommand({
            projectId: req.params.id,
            columnId,
            newIndex,
        });

        res.status(200);
        return res.json(updatedProject);
    } catch (e: any) {
        next(e);
    }
}
