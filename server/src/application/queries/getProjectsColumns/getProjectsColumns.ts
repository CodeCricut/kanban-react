import { GetColumnDto, IColumnRepository } from "../../contracts/column";
import { IProjectRepository } from "../../contracts/project";
import { IQueryHandler } from "../../queryHandler";

export type GetProjectsColumnsQuery = {
    projectId: string;
};

export class GetProjectsColumnsHandler
    implements IQueryHandler<GetProjectsColumnsQuery, GetColumnDto[]>
{
    constructor(
        private projectRepo: IProjectRepository,
        private columnRepo: IColumnRepository
    ) {}

    async handle(query: GetProjectsColumnsQuery): Promise<GetColumnDto[]> {
        const project = await this.projectRepo.read(query.projectId);
        return await this.columnRepo.readArray(project.columns);
    }
}
