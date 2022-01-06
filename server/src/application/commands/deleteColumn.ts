import {
    readProject,
    updateProject,
} from "../../persistence/project/ProjectRepository";
import { deleteColumn as deleteColumnFromDb } from "../../persistence/column/ColumnRepository";

type DeleteColumnCommand = {
    id: string;
    projectId: string;
};

export async function deleteColumn(command: DeleteColumnCommand) {
    const parentProject = await readProject(command.projectId);

    const columnIndex = parentProject.columns.findIndex(
        (col) => col == command.id
    );
    if (columnIndex < 0)
        throw new Error(
            "Tried to remove column from a project it did not belong to."
        );

    // Remove the column from the project
    parentProject.columns.splice(columnIndex, 1);
    await updateProject(command.projectId, parentProject);

    // Delete the column
    await deleteColumnFromDb(command.id);
}
