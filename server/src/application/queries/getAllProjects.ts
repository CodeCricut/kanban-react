import { GetProjectDto, IProjectRepository } from "../contracts/project";
import { IQueryHandler } from "../queryHandler";

export type GetAllProjectsQuery = {};

export class GetAllProjectsHandler
    implements IQueryHandler<GetAllProjectsQuery, GetProjectDto[]>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(query: GetAllProjectsQuery): Promise<GetProjectDto[]> {
        return await this.projectRepo.readAll();
    }
}
