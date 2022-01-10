import {
    GetPublicUserDto,
    RegisterUserDto,
} from "../../application/contracts/user";
import { User } from "../../domain/user";
import { hashUserPassword } from "../../services/bcrypt";
import { UserModel, UserModelType } from "./userModel";

export async function registerUser(
    dto: RegisterUserDto
): Promise<GetPublicUserDto> {
    const passwordHash: string = await hashUserPassword(dto.password);
    const user: User = {
        id: "",
        ...dto,
        passwordHash,
        ownedProjects: [],
        ownedColumns: [],
        ownedIssues: [],
    };

    const model = new UserModel(user);
    await model.save();

    return mapModelToPublicUser(model);
}

export async function getUserByUsername(
    username: string
): Promise<GetPublicUserDto> {
    const model = await UserModel.findOne({ username });
    if (!model) throw new Error("Couldn't find user with given username.");
    return mapModelToPublicUser(model);
}

export async function getUserByEmail(email: string): Promise<GetPublicUserDto> {
    const model = await UserModel.findOne({ email });
    if (!model) throw new Error("Couldn't find user with given email.");
    return mapModelToPublicUser(model);
}

function mapModelToPublicUser(model: UserModelType): GetPublicUserDto {
    const {
        id,
        username,
        createdAt,
        ownedProjects,
        ownedColumns,
        ownedIssues,
    } = model;
    return {
        id,
        username,
        createdAt,
        ownedProjects,
        ownedColumns,
        ownedIssues,
    };
}
