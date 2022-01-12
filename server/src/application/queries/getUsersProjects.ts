import { Project } from "../../domain/project";
import { User } from "../../domain/user";
import { getProjectsByIds } from "../../persistence/repository/ProjectRepository";
import { getUserById } from "../../persistence/repository/UserRepository";
import { GetProjectDto, mapToGetProjectDto } from "../contracts/project";
import { InvalidBackingStateError, NotAuthenticatedError } from "../errors";

type GetUsersProjectsQuery = {
    userId: string;
};
export async function handleGetUserProjects(
    query: GetUsersProjectsQuery
): Promise<GetProjectDto[]> {
    // Get user
    let user: User | null = await getUserById(query.userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Get projects of user
    const projects: (Project | null)[] = await getProjectsByIds(user.projects);

    return projects.map((proj, index) => {
        if (proj) return mapToGetProjectDto(proj);
        throw new InvalidBackingStateError(
            `User has reference to deleted project. (user ${user?.id} at index ${index}))`
        );
    });
}
