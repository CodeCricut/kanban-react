import { createColumn } from "../../domain/column";
import { addColumnToProject } from "../../domain/project";
import { User } from "../../domain/user";
import { getCurrentDateTimeString } from "../../library/dates";
import {
    getProjectById,
    updateProject,
} from "../../persistence/repository/ProjectRepository";
import { getUserById } from "../../persistence/repository/UserRepository";
import { mapToGetProjectDto } from "../contracts/project";
import {
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
} from "../errors";

type AddColumnToProjectCommand = {
    userId: string;
    projectId: string;
    columnIndex: number;
    name: string;
    description?: string;
};

export async function handleAddColumnToProjectCommand(
    command: AddColumnToProjectCommand
) {
    // Get user
    let user: User | null = await getUserById(command.userId);
    if (!user) {
        throw new NotAuthenticatedError();
    }

    // Make sure user is authorized to modify project
    if (!user.projects.includes(command.projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to edit project you don't own."
        );
    }

    // Get project
    let project = await getProjectById(command.projectId);
    if (!project)
        throw new NotFoundError(
            `Couldn't find project with id ${command.projectId}`
        );

    // Create new column object
    const createdAt = getCurrentDateTimeString();
    const { name, description, columnIndex } = command;
    const column = createColumn(name, description, createdAt);

    // Update project to include column
    project = addColumnToProject(project, column, columnIndex);
    project = await updateProject(project.id, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
