import { editProject } from "../../domain/project";
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

type EditProjectCommand = {
    id: string;
    name: string;
    description: string;
    userId: string;
};

export async function handleEditProjectCommand(command: EditProjectCommand) {
    // Get user
    let user: User | null = await getUserById(command.userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Ensure user is authorized to edit project
    if (!user.projects.includes(command.id)) {
        throw new NotAuthorizedError(
            "Not authorized to edit project you do not own."
        );
    }

    // Get project
    let project = await getProjectById(command.id);
    if (!project) throw new NotFoundError("Project not found.");

    // Update project
    project = editProject(project, command.name, command.description);
    project = await updateProject(project.id, project);

    return mapToGetProjectDto(project);
}
