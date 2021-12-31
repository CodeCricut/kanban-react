import {
    Project,
    createProjectObject as createProjectObject,
    addProject,
} from "../../domain/project";
import { convertDateToString } from "../../library/dates";
import { IDateTimeService } from "../contracts/dateTimeService";
import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

type Dependencies = {
    dateTimeService: IDateTimeService;
    projectsApiService: IProjectsApiService;
    projectStorageService: IProjectsStorageService;
};

export async function createProject(
    name: string,
    description: string,
    dependencies: Dependencies
): Promise<Project> {
    const {
        dateTimeService,
        projectsApiService: projectsApi,
        projectStorageService: projectsStorage,
    } = dependencies;

    // Create project object
    const currTime = dateTimeService.getCurrentDateTime();
    const currTimeStr = convertDateToString(currTime);

    const project = createProjectObject(name, description, currTimeStr);

    // Create project with api
    const addedProject = await projectsApi.createProject(project);

    // Add project to local state
    const currProjects = projectsStorage.projects;
    const updatedProjects = addProject(addedProject, currProjects);
    projectsStorage.updateProjects(updatedProjects);

    // return added project
    return addedProject;
}
