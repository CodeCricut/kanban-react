import mongoose, { Schema, Document } from "mongoose";
import { Column } from "../../domain/column";
import { ISSUE_MODEL_NAME } from "../issues/issueModel";

export const COLUMN_MODEL_NAME = "Column";

const ColumnSchema = new mongoose.Schema<Column>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    issues: [{ type: Schema.Types.ObjectId, ref: ISSUE_MODEL_NAME }],
    createdAt: { type: String, required: true },
});

export const ColumnModel = mongoose.model<Column>(
    COLUMN_MODEL_NAME,
    ColumnSchema
);

export type ColumnModelType = Column & Document<any, any, Column>;
