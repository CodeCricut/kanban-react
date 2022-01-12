import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../domain/user";

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
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
});

export const UserModel = mongoose.model<User>("User", UserSchema);

export type UserModelType = User & Document<any, any, User>;
