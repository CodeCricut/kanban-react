import mongoose from "mongoose";
import { Issue } from "../../domain/issue";

export const ISSUE_MODEL_NAME = "Issue";

const IssueSchema = new mongoose.Schema<Issue>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: String, required: true },
});

export const IssueModel = mongoose.model<Issue>(ISSUE_MODEL_NAME, IssueSchema);
