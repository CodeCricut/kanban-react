import { ProjectsApiService } from "./service";
import { appConfig } from "../../config";
import { IProjectsApiService } from "../../application/contracts/projectsApiService";

// TODO: this isn't the cleanest; shouldn't instantiate/access global deps
const service = new ProjectsApiService(appConfig);

export function useProjectsApiService(): IProjectsApiService {
    return service;
}
