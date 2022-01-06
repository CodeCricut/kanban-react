import { ICommandHandler } from "../../commandHandler";
import { IColumnRepository } from "../../contracts/column";
import { IProjectRepository } from "../../contracts/project";

export type DeleteColumnCommand = {
    id: string;
    projectId: string;
};

export class DeleteColumnHandler
    implements ICommandHandler<DeleteColumnCommand, void>
{
    constructor(
        private columnRepo: IColumnRepository,
        private projectRepo: IProjectRepository
    ) {}

    async handle(command: DeleteColumnCommand): Promise<void> {
        const parentProject = await this.projectRepo.read(command.projectId);

        const columnIndex = parentProject.columns.findIndex(
            (col) => col == command.id
        );
        if (columnIndex < 0)
            throw new Error(
                "Tried to remove column from a project it did not belong to."
            );

        // Remove the column from the project
        parentProject.columns.splice(columnIndex, 1);
        await this.projectRepo.update(command.projectId, parentProject);

        // Delete the column
        await this.columnRepo.delete(command.id);
    }
}
