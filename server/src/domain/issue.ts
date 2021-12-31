export type Issue = {
    id: string;
    name: string;
    description: string;
    /** The id of the column this issue belongs to. */
    columnId: string;
    createdAt: string;
};
