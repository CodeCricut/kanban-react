import { Issue } from "../../domain/issue";

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

export function mapToGetIssueDto(issue: Issue): GetIssueDto {
    const { id, name, description, createdAt } = issue;
    return {
        id,
        name,
        description,
        createdAt,
    };
}
