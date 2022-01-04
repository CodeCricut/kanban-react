import { ICommandHandler } from "../commandHandler";
import {
    GetProjectDto,
    IProjectRepository,
    UpdateProjectDto,
} from "../contracts/project";

export type ReorderColumnRightCommand = {
    projectId: string;
    columnId: string;
};

export class ReorderColumnRightHandler
    implements ICommandHandler<ReorderColumnRightCommand, GetProjectDto>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: ReorderColumnRightCommand): Promise<GetProjectDto> {
        const project = await this.projectRepo.read(command.projectId);

        // Find index of column
        const columnIndex = project.columns.findIndex(
            (colId) => colId == command.columnId
        );
        if (columnIndex < 0)
            throw new Error(
                "Tried moving column in project it didn't belong to."
            );

        if (columnIndex >= project.columns.length - 1)
            throw new Error(
                "Could not move column right because it was the last column."
            );

        project.columns[columnIndex] = project.columns[columnIndex + 1]; // Move right col left
        project.columns[columnIndex + 1] = command.columnId; // Move col right

        // Update project
        const updateDto: UpdateProjectDto = {
            name: project.name,
            description: project.description,
            columns: project.columns,
        };
        const updated = await this.projectRepo.update(project.id, updateDto);
        return updated;
    }
}
