import mongoose, { Document, Schema } from "mongoose";
import { Project } from "../../domain/project";
import { COLUMN_MODEL_NAME } from "../column/columnModel";

export const PROJECT_MODEL_NAME = "Project";

const ProjectSchema = new Schema<Project>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    columns: [{ type: Schema.Types.ObjectId, ref: COLUMN_MODEL_NAME }],
    createdAt: { type: String, required: true },
});

export const ProjectModel = mongoose.model<Project>(
    PROJECT_MODEL_NAME,
    ProjectSchema
);

export type ProjectModelType = Project & Document<any, any, Project>;
