import { ICommandHandler } from "../../commandHandler";
import {
    GetProjectDto,
    IProjectRepository,
    UpdateProjectDto,
} from "../../contracts/project";

export type ReorderColumnCommand = {
    projectId: string;
    columnId: string;
    newIndex: number;
};

export class ReorderColumnHandler
    implements ICommandHandler<ReorderColumnCommand, GetProjectDto>
{
    constructor(private projectRepo: IProjectRepository) {}

    async handle(command: ReorderColumnCommand): Promise<GetProjectDto> {
        const { columnId, newIndex, projectId } = command;
        const project = await this.projectRepo.read(projectId);

        if (newIndex < 0 || newIndex > project.columns.length - 1)
            throw new Error("Tried moving column to invalid index.");

        // Find index of column
        const columnIndex = project.columns.findIndex(
            (colId) => colId == columnId
        );
        if (columnIndex < 0)
            throw new Error(
                "Tried moving column in project it didn't belong to."
            );

        if (columnIndex == newIndex)
            throw new Error("Tried moving column to its current position.");

        project.columns[columnIndex] = project.columns[newIndex]; // Move col at new index to curr index
        project.columns[newIndex] = columnId; // Move col to new index

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
