import { NextFunction, Request, Response } from "express";
import {
    AddIssueToColumnCommand,
    AddIssueToColumnHandler,
} from "../application/commands/addIssueToColumn";
import {
    DeleteColumnCommand,
    DeleteColumnHandler,
} from "../application/commands/deleteColumn";
import {
    EditColumnCommand,
    EditColumnHandler,
} from "../application/commands/editColumn";
import { GetColumnDto } from "../application/contracts/column";

export class ColumnController {
    constructor(
        private editColumnHandler: EditColumnHandler,
        private deleteColumnHandler: DeleteColumnHandler,
        private addIssueHandler: AddIssueToColumnHandler
    ) {}

    editColumn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const command: EditColumnCommand = {
                id: req.params.id,
                name: req.body.name,
                description: req.body.description,
            };
            const updated: GetColumnDto = await this.editColumnHandler.handle(
                command
            );
            res.status(200);
            return res.json(updated);
        } catch (e: any) {
            next(e);
        }
    };

    deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
        const projectId: string = req.query.projectId as string;
        try {
            const command: DeleteColumnCommand = {
                id: req.params.id,
                projectId,
            };
            await this.deleteColumnHandler.handle(command);
            return res.send();
        } catch (e: any) {
            next(e);
        }
    };

    addIssue = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { issueIndex, name, description, createdAt } = req.body;
            const command: AddIssueToColumnCommand = {
                columnId: req.params.id,
                issueIndex,
                name,
                description,
                createdAt,
            };
            await this.addIssueHandler.handle(command);
            return res.send();
        } catch (e: any) {
            next(e);
        }
    };
}
