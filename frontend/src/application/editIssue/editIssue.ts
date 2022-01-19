import { updateProject } from "../../domain/project";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectsStorageService: IProjectsStorageService;
};

export async function editIssue(
    issueId: string,
    projectId: string,
    issue: {
        name: string;
        description?: string;
    },
    dependencies: Dependencies
) {
    const { projectsApiService, projectsStorageService } = dependencies;

    // Update issue with api
    const updatedProject = await projectsApiService.editIssue(projectId, {
        issueId,
        ...issue,
    });

    // Update project in local state
    const currProjects = projectsStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectsStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
