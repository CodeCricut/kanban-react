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

/** Pure function for editing an issue. */
export function editIssue(issue: Issue, name: string, description?: string) {
    // Copy the issue so it is pure
    const updatedIssue = copyIssue(issue);
    return {
        ...updatedIssue,
        name,
        description,
    };
}

export function copyIssue(issue: Issue): Issue {
    // Since issue may be database models, can't use spread operator
    const { issueId, name, description, createdAt } = issue;
    return {
        issueId,
        name,
        description,
        createdAt,
    };
}
