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
    passwordHash: string;
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
        projects: ownedProjects,
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
