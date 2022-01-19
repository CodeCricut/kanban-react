import { updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectsStorageService: IProjectsStorageService;
};

export async function relocateIssue(
    issueId: string,
    projectId: string,
    newColumnId: string,
    newIndex: number,
    dependencies: Dependencies
) {
    const { projectsApiService, projectsStorageService } = dependencies;

    // Update project with api
    const updatedProject = await projectsApiService.relocateIssue(projectId, {
        issueId,
        newColumnId,
        newIndex,
    });

    // Update project in local state
    const currProjects = projectsStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectsStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
