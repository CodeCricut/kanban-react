import { IProjectsApiService } from "../contracts/projectsApiService";

export type Dependencies = {
    projectsApiService: IProjectsApiService;
};

export async function getAllProjects({ projectsApiService }: Dependencies) {
    const projects = await projectsApiService.getAllProjects();
    return projects;
}
