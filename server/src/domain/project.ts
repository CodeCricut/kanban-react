export type Project = {
    id: string;
    name: string;
    description?: string;
    /** An ordered array containing the ids of the columsn belonging to this project. */
    columns: string[];
    createdAt: string;
};
