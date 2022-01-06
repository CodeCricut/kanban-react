export type GetIssueDto = {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
};

export type PostIssueDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export type UpdateIssueDto = {
    name: string;
    description: string;
    issues: string[];
};

export interface IIssueRepository {
    create(dto: PostIssueDto): Promise<GetIssueDto>;
    read(id: string): Promise<GetIssueDto>;
    readArray(ids: string[]): Promise<GetIssueDto[]>;
    // update(id: string, dto: UpdateIssueDto): Promise<GetIssueDto>;
    // delete(id: string): Promise<void>;
}
