import { IProjectsApiService } from "../contracts/projectsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";

export type Dependencies = {
    projectsApiService: IProjectsApiService;
};

export async function getAllProjects({ projectsApiService }: Dependencies) {
    const projects = await projectsApiService.getAllProjects();
    return projects;
}
