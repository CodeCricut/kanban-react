export type GetIssueDto = {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
};

export type PostIssueDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export type UpdateIssueDto = {
    name: string;
    description: string;
};
