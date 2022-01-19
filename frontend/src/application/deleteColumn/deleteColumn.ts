import { updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService,
    projectsStorageService: IProjectsStorageService
};

export async function deleteColumn(
    columnId: string,
    projectId: string,
    dependencies: Dependencies
) {
    const { projectsApiService, projectsStorageService } = dependencies;

    // Delete project with api
    const updatedProject = await projectsApiService.deleteColumn(columnId, projectId);

    // Update project in local state
    const currProjects = projectsStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectsStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
