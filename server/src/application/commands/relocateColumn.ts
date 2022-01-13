import {
    findColumnInProject,
    relocateProjectColumn,
} from "../../domain/project";
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

type RelocateColumnCommand = {
    userId: string;
    projectId: string;
    columnId: string;
    newIndex: number;
};
export async function handleRelocateColumnCommand(
    command: RelocateColumnCommand
) {
    const { userId, projectId, columnId, newIndex } = command;

    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before relocating column."
        );
    }

    // Ensure is is authorized to edit project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to relocate column of project you do not own."
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

    // Relocate column
    project = relocateProjectColumn(project, column, newIndex);

    // Update project
    project = await updateProject(projectId, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
