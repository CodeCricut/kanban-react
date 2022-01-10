import { Project } from "./project";

export type User = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    projects: string[];
};

/**
 * Pure function for adding a project to the user's list of referenced projects.
 */
export function addProjectToUser(
    project: Project,
    user: User,
    index: number = 0
): User {
    // Copy the user so it is pure
    const updatedUser = { ...user };
    // Add the project id at the index
    user.projects.splice(index, 0, project.id);
    return updatedUser;
}
