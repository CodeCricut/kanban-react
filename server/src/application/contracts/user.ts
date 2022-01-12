import { User } from "../../domain/user";

export type GetPublicUserDto = {
    id: string;
    username: string;
    createdAt: string;
    projects: string[];
};

export type GetPrivateUserDto = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    projects: string[];
};

export type RegisterUserDto = {
    username: string;
    email: string;
    password: string;
    createdAt: string;
};

export type LoginUserDto = {
    username: string;
    password: string;
};

export function mapToPrivateUserDto(model: User): GetPrivateUserDto {
    const { id, username, email, createdAt, projects } = model;
    return {
        id,
        username,
        email,
        createdAt,
        projects,
    };
}
