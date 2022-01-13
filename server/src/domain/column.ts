import { v4 as uuid } from "uuid";
import { IndexOutOfBoundsError } from "./errors";
import { Issue } from "./issue";

export type Column = {
    columnId: string;
    name: string;
    description?: string;
    issues: Issue[];
    createdAt: string;
};

export function createColumn(
    name: string,
    description: string | undefined,
    createdAt: string
): Column {
    return {
        columnId: uuid(),
        name,
        description,
        createdAt,
        issues: [],
    };
}

/**
 * Pure function for inserting issue to column at the given index.
 */
export function addIssueToColumn(
    column: Column,
    issue: Issue,
    issueIndex: number
) {
    if (column.issues.length < issueIndex || issueIndex < 0) {
        throw new IndexOutOfBoundsError(
            `Issue index ${issueIndex} out of bounds.`
        );
    }

    // Copy column to keep function pure
    const updatedColumn = copyColumn(column);
    updatedColumn.issues.splice(issueIndex, 0, issue);
    return updatedColumn;
}

export function copyColumn(column: Column): Column {
    // Since columns may be database models, can't use spread operator
    const { columnId, name, description, createdAt, issues } = column;
    return {
        columnId,
        name,
        description,
        createdAt,
        issues: [...issues],
    };
}
