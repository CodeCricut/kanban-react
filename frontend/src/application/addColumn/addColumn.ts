import { Project, updateProject } from "../../domain/project";
import { IDateTimeService } from "../contracts/dateTimeService";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
};

export async function addColumn(
    project: Project,
    column: { name: string; description?: string },
    dependencies: Dependencies
) {
    const { projectStorageService, projectsApiService } = dependencies;

    if (!project.id)
        throw new Error("Tried to add column to project without id.");

    // Add column to last index
    const columnIndex = project.columns?.length ?? 0;

    // Update project with api
    const updatedProject = await projectsApiService.addColumn(project.id, {
        columnIndex,
        ...column,
    });

    // Update project in local state
    const currProjects = projectStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
