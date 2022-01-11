import { Column } from "./column";
import { User } from "./user";

export type Project = {
    id: string;
    users: string[];
    name: string;
    description?: string;
    columns: Column[];
    createdAt: string;
};

/**
 * Pure function for adding a project to the user's list of referenced projects.
 */
export function addUserToProject(
    user: User,
    project: Project,
    index: number = 0
): Project {
    // Copy the project so it is pure
    const updatedProject = { ...project };
    // Add the user id at the index
    project.users.splice(index, 0, user.id);
    return updatedProject;
}

/** Pure function for editing a project. */
export function editProject(
    project: Project,
    name: string,
    description?: string
) {
    return { ...project, name, description };
}
