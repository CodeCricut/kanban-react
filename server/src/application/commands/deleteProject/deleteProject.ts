import { ICommandHandler } from "../../commandHandler";
import { IProjectRepository } from "../../contracts/project";

export type DeleteProjectCommand = {
    id: string;
};

export class DeleteProjectHandler
    implements ICommandHandler<DeleteProjectCommand, void>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: DeleteProjectCommand): Promise<void> {
        await this.projectRepo.delete(command.id);
    }
}
