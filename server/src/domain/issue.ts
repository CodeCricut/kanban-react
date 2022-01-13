import { v4 as uuid } from "uuid";

export type Issue = {
    issueId: string;
    name: string;
    description?: string;
    createdAt: string;
};

export function createIssue(
    name: string,
    description: string | undefined,
    createdAt: string
): Issue {
    return {
        issueId: uuid(),
        name,
        description,
        createdAt,
    };
}
