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

export interface IProjectRepository {
    create(dto: PostProjectDto): Promise<GetProjectDto>;
    read(id: string): Promise<GetProjectDto>;
    update(id: string, dto: UpdateProjectDto): Promise<GetProjectDto>;
    delete(id: string): Promise<void>;
}
