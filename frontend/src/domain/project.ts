export type Project = {
    id?: string;
    name?: string;
    description?: string;
    /** An ordered array containing the ids of the columsn belonging to this project. */
    columns?: string[];
    createdAt?: string;
};

export function createProjectObject(
    name: string,
    description: string,
    createdAt: string
): Project {
    return {
        name,
        description,
        createdAt,
        columns: [],
    };
}

/** Pure function for adding project to array of projects. */
export function addProject(project: Project, projects: Project[]): Project[] {
    return [...projects, project];
}

/** Pure function for updating the values of a single project in the array of projects. The project which has a matching id field will be updated. */
export function updateProject(
    project: Project,
    projects: Project[]
): Project[] {
    // Find the project to update
    const matchingIndex = projects.findIndex((proj) => proj.id === project.id);
    if (matchingIndex < 0)
        throw new Error(
            "Tried to update project in array where it was not present."
        );

    // Copy the project arr and update the project at the index
    const updatedProjects = [...projects];
    updatedProjects[matchingIndex] = project;
    return updatedProjects;
}

/** Pure function for removing project to array of projects. */
export function removeProject(id: string, projects: Project[]): Project[] {
    // Find the project to remove
    const matchingIndex = projects.findIndex((proj) => proj.id === id);
    if (matchingIndex < 0)
        throw new Error(
            "Tried to remove project from array where it was not present."
        );

    // Copy the project arr and remove the project at the index
    const updatedProjects = [...projects];
    updatedProjects.splice(matchingIndex, 1);
    return updatedProjects;
}
