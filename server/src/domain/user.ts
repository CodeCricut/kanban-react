export type User = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    ownedProjects: string[];
    ownedColumns: string[];
    ownedIssues: string[];
};
