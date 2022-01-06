export type Issue = {
    id?: string;
    name?: string;
    description?: string;
    createdAt?: string;
};

export function createIssueObject(
    name: string,
    description: string,
    createdAt: string
) {
    return {
        name,
        description,
        createdAt,
    };
}
