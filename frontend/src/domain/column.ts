import { Issue } from "./issue";

export type Column = {
    id?: string;
    name?: string;
    description?: string;
    issues?: Issue[];
    createdAt?: string;
};

export function createColumnObject(
    name: string,
    description: string,
    createdAt: string
): Column {
    return {
        name,
        description,
        createdAt,
        issues: [],
    };
}
