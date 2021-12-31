export type Column = {
    id: string;
    name: string;
    description: string;
    /** The id of the project this column belongs to. */
    projectId: string;
    /** An ordered array containing the ids of the issues belonging to this column. */
    issues: string[];
    createdAt: string;
};
