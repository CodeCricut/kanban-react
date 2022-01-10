import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../domain/user";
import { COLUMN_MODEL_NAME } from "../column/columnModel";
import { ISSUE_MODEL_NAME } from "../issues/issueModel";
import { PROJECT_MODEL_NAME } from "../project/projectModel";

export const USER_MODEL_NAME = "User";

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    ownedProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: PROJECT_MODEL_NAME,
        },
    ],
    ownedColumns: [
        {
            type: Schema.Types.ObjectId,
            ref: COLUMN_MODEL_NAME,
        },
    ],
    ownedIssues: [
        {
            type: Schema.Types.ObjectId,
            ref: ISSUE_MODEL_NAME,
        },
    ],
});

export const UserModel = mongoose.model<User>(USER_MODEL_NAME, UserSchema);

export type UserModelType = User & Document<any, any, User>;
