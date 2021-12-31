import { Project } from "../../domain/project";

export interface IProjectsStorageService {
    projects: Project[];
    updateProjects: (projects: Project[]) => void;
}
