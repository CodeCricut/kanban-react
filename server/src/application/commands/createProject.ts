import { Project } from "../../domain/project";
import { IProjectRepository } from "../../domain/repository";
import { ICommandHandler } from "../commandHandler";

export type CreateProjectCommand = {
    name: string;
    description: string;
    createdAt: string;
};

export class CreateProjectHandler
    implements ICommandHandler<CreateProjectCommand, Project>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: CreateProjectCommand): Promise<Project> {
        const { name, description, createdAt } = command;
        const project: Project = {
            name,
            description,
            createdAt,
            columns: [],
        };

        const created = await this.projectRepo.create(project);
        return created;
    }
}
