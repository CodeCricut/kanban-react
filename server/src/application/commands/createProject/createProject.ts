import { Project } from "../../../domain/project";
import { ICommandHandler } from "../../commandHandler";
import {
    GetProjectDto,
    IProjectRepository,
    PostProjectDto,
} from "../../contracts/project";

export type CreateProjectCommand = {
    name: string;
    description: string;
    createdAt: string;
};

export class CreateProjectHandler
    implements ICommandHandler<CreateProjectCommand, GetProjectDto>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: CreateProjectCommand): Promise<GetProjectDto> {
        const postDto: PostProjectDto = command;
        const created = await this.projectRepo.create(postDto);
        return created;
    }
}
