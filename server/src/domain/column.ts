import { Issue } from "./issue";

export type Column = {
    id: string;
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
        id: "",
        name,
        description,
        createdAt,
        issues: [],
    };
}
