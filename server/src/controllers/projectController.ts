import { NextFunction, Request, Response } from "express";
import {
    AddColumnToProjectCommand,
    AddColumnToProjectHandler,
} from "../application/commands/addColumnToProject/addColumnToProject";
import {
    CreateProjectCommand,
    CreateProjectHandler,
} from "../application/commands/createProject/createProject";
import {
    DeleteProjectCommand,
    DeleteProjectHandler,
} from "../application/commands/deleteProject/deleteProject";
import {
    EditProjectCommand,
    EditProjectHandler,
} from "../application/commands/editProject/editProject";
import {
    ReorderColumnCommand,
    ReorderColumnHandler,
} from "../application/commands/reorderColumn/reorderColumn";
import { GetColumnDto } from "../application/contracts/column";
import { GetProjectDto } from "../application/contracts/project";
import {
    GetAllProjectsHandler,
    GetAllProjectsQuery,
} from "../application/queries/getAllProjects/getAllProjects";
import {
    GetProjectsColumnsHandler,
    GetProjectsColumnsQuery,
} from "../application/queries/getProjectsColumns/getProjectsColumns";

export class ProjectController {
    constructor(
        private createProjectHandler: CreateProjectHandler,
        private getAllProjectsHandler: GetAllProjectsHandler,
        private editProjectHandler: EditProjectHandler,
        private deleteProjectHandler: DeleteProjectHandler,
        private addColumnToProjectHandler: AddColumnToProjectHandler,
        private getProjectColumnsHandler: GetProjectsColumnsHandler,
        private reorderColumnRightHandler: ReorderColumnHandler
    ) {}

    createProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command: CreateProjectCommand = req.body;

            const created: GetProjectDto =
                await this.createProjectHandler.handle(command);
            res.status(200);
            return res.json(created);
        } catch (e: any) {
            next(e);
        }
    };

    getAllProjects = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const allProjects = await this.getAllProjectsHandler.handle({});
            res.status(200);
            return res.json(allProjects);
        } catch (e: any) {
            next(e);
        }
    };

    editProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command: EditProjectCommand = {
                id: req.params.id,
                name: req.body.name,
                description: req.body.description,
            };
            const updated: GetProjectDto = await this.editProjectHandler.handle(
                command
            );
            res.status(200);
            return res.json(updated);
        } catch (e: any) {
            next(e);
        }
    };

    deleteProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command: DeleteProjectCommand = {
                id: req.params.id,
            };
            await this.deleteProjectHandler.handle(command);
            res.status(200);
            return res.send();
        } catch (e: any) {
            next(e);
        }
    };

    addColumn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { columnIndex, name, description, createdAt } = req.body;
            const command: AddColumnToProjectCommand = {
                projectId: req.params.id,
                columnIndex,
                name,
                description,
                createdAt,
            };
            const updatedProject = await this.addColumnToProjectHandler.handle(
                command
            );
            res.status(200);
            return res.json(updatedProject);
        } catch (e: any) {
            next(e);
        }
    };

    getProjectColumns = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query: GetProjectsColumnsQuery = {
                projectId: req.params.id,
            };
            const projColumns: GetColumnDto[] =
                await this.getProjectColumnsHandler.handle(query);
            res.status(200);
            return res.json(projColumns);
        } catch (e: any) {
            next(e);
        }
    };

    reorderColumn = async (req: Request, res: Response, next: NextFunction) => {
        const columnId: string = req.query.columnId as string;
        const newIndex: number = Number(req.query.newIndex);
        try {
            const command: ReorderColumnCommand = {
                projectId: req.params.id,
                columnId,
                newIndex,
            };
            const updatedProject = await this.reorderColumnRightHandler.handle(
                command
            );
            res.status(200);
            return res.json(updatedProject);
        } catch (e: any) {
            next(e);
        }
    };
}
