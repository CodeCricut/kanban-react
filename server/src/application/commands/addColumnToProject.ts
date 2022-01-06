import { createColumn } from "../../persistence/column/ColumnRepository";
import {
    readProject,
    updateProject,
} from "../../persistence/project/ProjectRepository";
import { PostColumnDto } from "../contracts/column";

type AddColumnToProjectCommand = {
    projectId: string;
    columnIndex: number;
    name: string;
    description?: string;
    createdAt: string;
};

export async function handleAddColumnToProjectCommand(
    command: AddColumnToProjectCommand
) {
    const parentProject = await readProject(command.projectId);
    if (
        command.columnIndex > parentProject.columns.length ||
        command.columnIndex < 0
    )
        throw new Error("Tried inserting column at invalid index");

    const postDto: PostColumnDto = command;
    const created = await createColumn(postDto);

    parentProject.columns.splice(command.columnIndex, 0, created.id);

    return await updateProject(parentProject.id, parentProject);
}
