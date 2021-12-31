import { NextFunction, Request, Response } from "express";
import {
    CreateProjectCommand,
    CreateProjectHandler,
} from "../application/commands/createProject";
import { Project } from "../domain/project";

export class ProjectController {
    private _createProjectHandler: CreateProjectHandler;
    constructor(createProj: CreateProjectHandler) {
        this._createProjectHandler = createProj;
    }

    createProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command: CreateProjectCommand = req.body;

            const created: Project = await this._createProjectHandler.handle(
                command
            );
            return res.json(created);
        } catch (e: any) {
            next(e);
        }
    };
}
