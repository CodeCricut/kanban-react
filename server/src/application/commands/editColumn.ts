import { editColumn } from "../../domain/column";
import { findColumnInProject, updateProjectColumn } from "../../domain/project";
import { User } from "../../domain/user";
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

type EditColumnCommand = {
    userId: string;
    projectId: string;
    columnId: string;
    name: string;
    description?: string;
};
export async function handleEditColumnCommand(command: EditColumnCommand) {
    const { userId, projectId, columnId, name, description } = command;
    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Ensure user is authorized to edit project
    if (!user.projects.includes(command.projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to edit column of project you do not own."
        );
    }
    // Get project
    let project = await getProjectById(projectId);
    if (!project) throw new NotFoundError("Project not found.");

    // Get column
    let column = findColumnInProject(project, columnId);
    if (!column) {
        throw new NotFoundError(
            `Column with id ${columnId} not found in project.`
        );
    }

    // Update column
    column = editColumn(column, name, description);

    // Update project
    project = updateProjectColumn(project, column);
    project = await updateProject(projectId, project);

    // Return project
    return mapToGetProjectDto(project);
}
