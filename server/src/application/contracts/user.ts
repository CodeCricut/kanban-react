export type GetPublicUserDto = {
    id: string;
    username: string;
    createdAt: string;
    ownedProjects: string[];
    ownedColumns: string[];
    ownedIssues: string[];
};

export type GetPrivateUserDto = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    ownedProjects: string[];
    ownedColumns: string[];
    ownedIssues: string[];
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
