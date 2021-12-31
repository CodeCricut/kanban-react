import { ProjectsApiService } from "./service";
import { appConfig } from "../../config";

// TODO: this isn't the cleanest; shouldn't instantiate/access global deps
const service = new ProjectsApiService(appConfig);

export function useProjectsApiService() {
    return service;
}
