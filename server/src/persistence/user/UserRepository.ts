import {
    GetPrivateUserDto,
    GetPublicUserDto,
    LoginUserDto,
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

export async function getPrivateUserByUsername({
    username,
}: LoginUserDto): Promise<GetPrivateUserDto> {
    const model = await UserModel.findOne({ username });
    if (!model) throw new Error("Couldn't find user with given username.");
    return mapModelToPrivateUser(model);
}

export async function readPrivateUser(id: string): Promise<GetPrivateUserDto> {
    const model = await UserModel.findById(id);
    if (!model) throw new Error("Couldn't find user with given id.");
    return mapModelToPrivateUser(model);
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

function mapModelToPrivateUser(model: UserModelType): GetPrivateUserDto {
    const {
        id,
        username,
        email,
        passwordHash,
        createdAt,
        ownedProjects,
        ownedColumns,
        ownedIssues,
    } = model;
    return {
        id,
        username,
        email,
        passwordHash,
        createdAt,
        ownedProjects,
        ownedColumns,
        ownedIssues,
    };
}
