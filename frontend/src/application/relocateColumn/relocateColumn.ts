import { updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
};

export async function relocateColumn(
    columnId: string,
    projectId: string,
    newIndex: number,
    dependencies: Dependencies
) {
    const { projectStorageService, projectsApiService } = dependencies;

    // Update project with api
    const updatedProject = await projectsApiService.relocateColumn(
        projectId,
        {
            columnId,
            newIndex
        }
    );

    // Update project in local state
    const currProjects = projectStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
