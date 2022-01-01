import { ICommandHandler } from "../commandHandler";
import {
    GetProjectDto,
    IProjectRepository,
    UpdateProjectDto,
} from "../contracts/project";

export type EditProjectCommand = {
    id: string;
    name: string;
    description: string;
};

export class EditProjectHandler
    implements ICommandHandler<EditProjectCommand, GetProjectDto>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: EditProjectCommand): Promise<GetProjectDto> {
        const existingProject = await this.projectRepo.read(command.id);

        const updateDto: UpdateProjectDto = {
            name: command.name,
            description: command.description,
            columns: existingProject.columns,
        };

        const updated = await this.projectRepo.update(command.id, updateDto);
        return updated;
    }
}
