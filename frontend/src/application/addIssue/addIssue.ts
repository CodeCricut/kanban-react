import { Column } from "../../domain/column";
import { createIssueObject } from "../../domain/issue";
import { Project, updateProject } from "../../domain/project";
import { convertDateToString } from "../../library/dates";
import { IDateTimeService } from "../contracts/dateTimeService";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService,
    projectsStorageService: IProjectsStorageService
};

export async function addIssue(
    project: Project,
    column: Column,
    issue: {
        name: string,
        description?: string
    },
    dependencies: Dependencies
): Promise<Project> {
    const { projectsApiService, projectsStorageService } =
        dependencies;

    if (!project.id) throw new Error("Tried to add issue to project without id.")
    if (!column.id) throw new Error("Tried to add issue to column without id.")

    // Add issue to last index
    const issueIndex = column.issues?.length ?? 0;

    const updatedProject = await projectsApiService.addIssue(project.id, {
        columnId: column.id,
        issueIndex,
        ...issue
    })

   // Update project in local state
    const currProjects = projectsStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectsStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
