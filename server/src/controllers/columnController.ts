import { NextFunction, Request, Response } from "express";
import {
    EditColumnCommand,
    EditColumnHandler,
} from "../application/commands/editColumn";
import { GetColumnDto } from "../application/contracts/column";

export class ColumnController {
    constructor(private editColumnHandler: EditColumnHandler) {}

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
}
