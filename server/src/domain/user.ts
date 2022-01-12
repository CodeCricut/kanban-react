import { EntityNotInParentError } from "./errors";
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
    const updatedUser = copyUser(user);
    // Add the project id at the index
    updatedUser.projects.splice(index, 0, project.id); // todo remove this intentniakaldfj
    return updatedUser;
}

/**
 * Pure function for removing a project from the user's list of referenced projects.
 */
export function removeProjectFromUser(project: Project, user: User): User {
    // Copy the user so it is pure
    const updatedUser = copyUser(user);

    // Find index of project
    const projectIndex = user.projects.findIndex(
        (projId) => projId == project.id
    );
    if (projectIndex < 0)
        throw new EntityNotInParentError(
            "Tried to remove project from user it was not found in."
        );

    // Remove the project id at the index
    updatedUser.projects.splice(projectIndex, 1);
    return updatedUser;
}

/**
 * Pure function for getting a shallow(ish) copy of the user.
 */
export function copyUser(user: User): User {
    // Since users may be database models, can't use spread operator
    const { id, username, email, createdAt, passwordHash, projects } = user;
    return {
        id,
        username,
        email,
        createdAt,
        passwordHash,
        projects: [...projects],
    };
}
