export type GetColumnDto = {
    id: string;
    name: string;
    description?: string;
    issues: string[];
    createdAt: string;
};

export type PostColumnDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export type UpdateColumnDto = {
    name: string;
    description?: string;
    issues: string[];
};

export interface IColumnRepository {
    create(dto: PostColumnDto): Promise<GetColumnDto>;
    read(id: string): Promise<GetColumnDto>;
    readAll(): Promise<GetColumnDto[]>;
    update(id: string, dto: UpdateColumnDto): Promise<GetColumnDto>;
    delete(id: string): Promise<void>;
}
