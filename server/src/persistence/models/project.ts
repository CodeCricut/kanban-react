import mongoose, { Document, Schema } from "mongoose";
import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";
import { Project } from "../../domain/project";

const IssueSchema = new mongoose.Schema<Issue>({
    issueId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: String, required: true },
});

const ColumnSchema = new mongoose.Schema<Column>({
    columnId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    issues: [IssueSchema],
    createdAt: { type: String, required: true },
});

const ProjectSchema = new Schema<Project>({
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    name: { type: String, required: true },
    description: { type: String, required: false },
    columns: [ColumnSchema],
    createdAt: { type: String, required: true },
});

export const ProjectModel = mongoose.model<Project>("Project", ProjectSchema);

export type ProjectModelType = Project & Document<any, any, Project>;
