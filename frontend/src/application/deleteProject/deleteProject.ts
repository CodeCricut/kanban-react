import { removeProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
};

export async function deleteProject(id: string, dependencies: Dependencies) {
    const { projectStorageService, projectsApiService } = dependencies;

    // Delete with api
    await projectsApiService.deleteProject(id);

    // Remove from local storage
    const currProjects = projectStorageService.projects;
    const updatedProjects = removeProject(id, currProjects);
    projectStorageService.updateProjects(updatedProjects);
}
