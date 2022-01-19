import { IProjectsApiService } from "../../application/contracts/projectsApiService";
import { Project } from "../../domain/project";
import axios from "axios";
import { AppConfig } from "../../config";
import { Column } from "../../domain/column";

export class ProjectsApiService implements IProjectsApiService {
    private _config: AppConfig;

    constructor(config: AppConfig) {
        this._config = config;
    }

    getAllProjects = async (): Promise<Project[]> => {
        const response = await axios.get(this._config.getAllProjectsRoute);
        let returnedProjects: Project[] = response.data;
        return returnedProjects;
    };

    createProject = async (project: Project) => {
        const response = await axios.post(
            this._config.createProjectRoute,
            project
        );
        let returnedProject: Project = response.data;
        return returnedProject;
    };

    editProject = async (
        id: string,
        name: string,
        description: string
    ): Promise<Project> => {
        const response = await axios.put(this._config.editProjectRoute(id), {
            name,
            description,
        });
        let returnedProject: Project = response.data;
        return returnedProject;
    };

    deleteProject = async (id: string): Promise<void> => {
        await axios.delete(this._config.deleteProjectRoute(id));
    };

    addColumn = async (
        projectId: string,
        columnIndex: number,
        column: Column
    ): Promise<Project> => {
        const requestBody = {
            columnIndex,
            name: column.name,
            description: column.description,
            createdAt: column.createdAt,
        };

        const response = await axios.post(
            this._config.addColumnToProjectRoute(projectId),
            requestBody
        );

        let returnedProject: Project = response.data;
        return returnedProject;
    };

    reorderColumns = async (
        projectId: string,
        columnId: string,
        newIndex: number
    ): Promise<Project> => {
        const response = await axios.put(
            this._config.reorderColumnRoute(projectId, columnId, newIndex)
        );
        let returnedProject: Project = response.data;
        return returnedProject;
    };
}
