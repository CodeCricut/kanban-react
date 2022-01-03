export type Column = {
    id?: string;
    name?: string;
    description?: string;
    issues?: string[];
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
