import { Project, updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
};

export async function editProject(
    id: string,
    name: string,
    description: string,
    dependencies: Dependencies
): Promise<Project> {
    const { projectStorageService, projectsApiService } = dependencies;

    // Update project with api
    const updatedProject = await projectsApiService.editProject(
        id,
        name,
        description
    );

    // Update project in local state
    const currProjects = projectStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
