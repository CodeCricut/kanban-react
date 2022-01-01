import { IProjectsApiService } from "../../application/contracts/projectsApiService";
import { Project } from "../../domain/project";
import axios from "axios";
import { AppConfig } from "../../config";

export class ProjectsApiService implements IProjectsApiService {
    private _config: AppConfig;

    constructor(config: AppConfig) {
        this._config = config;
    }

    async getAllProjects(): Promise<Project[]> {
        const response = await axios.get(this._config.getAllProjectsRoute);
        let returnedProjects: Project[] = response.data;
        return returnedProjects;
    }

    async createProject(project: Project) {
        const response = await axios.post(
            this._config.createProjectRoute,
            project
        );
        let returnedProject: Project = response.data;
        return returnedProject;
    }
}
