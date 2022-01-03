import { Column, createColumnObject } from "../../domain/column";
import { Project, updateProject } from "../../domain/project";
import { convertDateToString } from "../../library/dates";
import { IDateTimeService } from "../contracts/dateTimeService";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
    dateTimeService: IDateTimeService;
};

export async function addColumnToProject(
    project: Project,
    name: string,
    description: string,
    dependencies: Dependencies
) {
    const { projectStorageService, projectsApiService, dateTimeService } =
        dependencies;

    // Add column to last index
    const columnIndex = project.columns?.length ?? 0;

    // Create column object
    const currTime = dateTimeService.getCurrentDateTime();
    const currTimeStr = convertDateToString(currTime);

    const column = createColumnObject(name, description, currTimeStr);

    // Update project with api
    const updatedProject = await projectsApiService.addColumn(
        project.id ?? "",
        columnIndex,
        column
    );

    // Update project in local state
    const currProjects = projectStorageService.projects;
    const updatedProjects = updateProject(updatedProject, currProjects);
    projectStorageService.updateProjects(updatedProjects);

    // Return updated project
    return updatedProject;
}
