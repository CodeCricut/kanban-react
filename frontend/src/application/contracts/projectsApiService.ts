import { Project } from "../../domain/project";

export interface IProjectsApiService {
    createProject(project: Project): Promise<Project>;
    getAllProjects(): Promise<Project[]>;
}
