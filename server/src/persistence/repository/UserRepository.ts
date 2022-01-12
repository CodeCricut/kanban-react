import { User } from "../../domain/user";
import { hashUserPassword } from "../../services/bcrypt";
import { NotFoundError } from "../errors";
import { UserModel, UserModelType } from "../models/user";

type RegisterUserProps = {
    username: string;
    email: string;
    password: string;
    createdAt: string;
};

export async function registerUser(props: RegisterUserProps): Promise<User> {
    const passwordHash: string = await hashUserPassword(props.password);
    const model = new UserModel({
        ...props,
        passwordHash,
        projects: [],
    });
    return await model.save();
}

export async function getUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
}

export async function getUserByUsername(
    username: string
): Promise<User | null> {
    return await UserModel.findOne({ username });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
}

type UpdateUserProps = {
    projects: string[];
};
export async function updateUser(
    id: string,
    updateProps: UpdateUserProps
): Promise<User> {
    let userModel = await UserModel.findById(id);
    if (!userModel) {
        throw new NotFoundError(
            `User not found; tried to update user with id ${id}.`
        );
    }

    userModel.projects = updateProps.projects;
    return await userModel.save();
}
