import { deleteProjectColumn, findColumnInProject } from "../../domain/project";
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

type DeleteColumnCommand = {
    userId: string;
    projectId: string;
    columnId: string;
};
export async function handleDeleteColumnCommand(command: DeleteColumnCommand) {
    const { userId, projectId, columnId } = command;
    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before deleting column."
        );
    }

    // Ensure is is authorized to edit project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to delete column of project you do not own."
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

    // Delete column
    project = deleteProjectColumn(project, column);

    // Update project
    project = await updateProject(projectId, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
