import { updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService,
    projectsStorageService: IProjectsStorageService
};

export async function deleteIssue(
    issueId: string,
    columnId: string,
    dependencies: Dependencies
) {
    const { projectsApiService, projectsStorageService } = dependencies;

    // Delete issue with api
    const updatedProject = await projectsApiService.deleteIssue(issueId, columnId);

    // Update project in local state
    const currProjects = projectsStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectsStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
