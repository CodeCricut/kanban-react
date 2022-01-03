import { Column } from "../../domain/column";
import { Project } from "../../domain/project";

export interface IProjectsApiService {
    createProject(project: Project): Promise<Project>;
    getAllProjects(): Promise<Project[]>;
    editProject(
        id: string,
        name: string,
        description: string
    ): Promise<Project>;
    deleteProject(id: string): Promise<void>;
    addColumn(
        projectId: string,
        columnIndex: number,
        column: Column
    ): Promise<Project>;
}
