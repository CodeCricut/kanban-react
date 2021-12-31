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
