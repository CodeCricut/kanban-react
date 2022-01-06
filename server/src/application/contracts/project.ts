export type GetProjectDto = {
    id: string;
    name: string;
    description?: string;
    /** An ordered array containing the ids of the columsn belonging to this project. */
    columns: string[];
    createdAt: string;
};

export type PostProjectDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export type UpdateProjectDto = {
    name: string;
    description?: string;
    columns: string[];
};
