import { addUserToProject, Project } from "../../domain/project";
import { addProjectToUser, User } from "../../domain/user";
import { getCurrentDateTimeString } from "../../library/dates";
import {
    createProject,
    updateProject,
} from "../../persistence/repository/ProjectRepository";
import {
    getUserById,
    updateUser,
} from "../../persistence/repository/UserRepository";
import { GetProjectDto, mapToGetProjectDto } from "../contracts/project";
import { NotAuthenticatedError } from "../errors";

type CreateProjectCommand = {
    name: string;
    description?: string;
    userId: string;
};

export async function handleCreateProjectCommand(
    command: CreateProjectCommand
): Promise<GetProjectDto> {
    // Get user
    let user: User | null = await getUserById(command.userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Create project with reference to user
    let createProjectProps = {
        name: command.name,
        description: command.description,
        createdAt: getCurrentDateTimeString(),
        users: [user.id],
    };
    let project: Project = await createProject(createProjectProps);

    // Add project reference to user
    user = addProjectToUser(project, user);
    await updateUser(user.id, user);

    // Return created project
    return mapToGetProjectDto(project);
}
