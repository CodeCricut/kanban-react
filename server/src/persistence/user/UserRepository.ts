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
