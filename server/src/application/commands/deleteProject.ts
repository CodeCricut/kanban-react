import { removeProjectFromUser, User } from "../../domain/user";
import {
    deleteProject,
    getProjectById,
} from "../../persistence/repository/ProjectRepository";
import {
    getUserById,
    updateUser,
} from "../../persistence/repository/UserRepository";
import {
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
} from "../errors";

type DeleteProjectCommand = {
    id: string;
    userId: string;
};

export async function handleDeleteProjectCommand(
    command: DeleteProjectCommand
) {
    // Get user
    let user: User | null = await getUserById(command.userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Ensure user is authorized to delete project
    if (!user.projects.includes(command.id)) {
        throw new NotAuthorizedError(
            "Not authorized to delete project you do not own."
        );
    }

    // Get project
    const project = await getProjectById(command.id);
    if (!project) throw new NotFoundError();

    // Remove project reference from user
    user = removeProjectFromUser(project, user);
    await updateUser(user.id, user);

    // Delete project
    await deleteProject(command.id);
}
