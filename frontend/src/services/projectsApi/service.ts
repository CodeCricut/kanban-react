import {
    AddColumnBody,
    AddIssueBody,
    CreateProjectBody,
    EditColumnBody,
    EditIssueBody,
    EditProjectBody,
    IProjectsApiService,
    RelocateColumnBody,
    RelocateIssuetype,
} from "../../application/contracts/projectsApiService";
import { Project } from "../../domain/project";
import axios from "axios";
import { appConfig } from "../../config";
import { IJwtStorageService } from "../../application/contracts/jwtStorageService";

export class ProjectsApiService implements IProjectsApiService {
    constructor(private jwtService: IJwtStorageService) {}

    getAuthorizedHeaders() {
        const jwt = this.jwtService.jwt;
        if (!jwt)
            throw new Error(
                `Tried to make authorized request without jwt set.`
            );
        return {
            token: jwt,
        };
    }

    // Projects
    createProject = async (body: CreateProjectBody): Promise<Project> => {
        const { data: project } = await axios.post(
            appConfig.createProjectRoute,
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    editProject = async (
        id: string,
        body: EditProjectBody
    ): Promise<Project> => {
        const { data: project } = await axios.put(
            appConfig.editProjectRoute(id),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    deleteProject = async (id: string): Promise<void> => {
        await axios.delete(appConfig.deleteProjectRoute(id), {
            headers: this.getAuthorizedHeaders(),
        });
    };

    // Columns
    addColumn = async (
        projectId: string,
        body: AddColumnBody
    ): Promise<Project> => {
        const { data: project } = await axios.post(
            appConfig.addColumnRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    relocateColumn = async (
        projectId: string,
        body: RelocateColumnBody
    ): Promise<Project> => {
        const { data: project } = await axios.put(
            appConfig.relocateColumnRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    editColumn = async (
        projectId: string,
        body: EditColumnBody
    ): Promise<Project> => {
        const { data: project } = await axios.put(
            appConfig.editColumnRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    deleteColumn = async (
        projectId: string,
        columnId: string
    ): Promise<Project> => {
        const { data: project } = await axios.delete(
            appConfig.deleteColumnRoute(projectId, columnId),
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    // Issues
    addIssue = async (
        projectId: string,
        body: AddIssueBody
    ): Promise<Project> => {
        const { data: project } = await axios.post(
            appConfig.addIssueRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    editIssue = async (
        projectId: string,
        body: EditIssueBody
    ): Promise<Project> => {
        const { data: project } = await axios.put(
            appConfig.editIssueRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    deleteIssue = async (
        projectId: string,
        issueId: string
    ): Promise<Project> => {
        const { data: project } = await axios.delete(
            appConfig.deleteIssueRoute(projectId, issueId),
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };

    relocateIssue = async (
        projectId: string,
        body: RelocateIssuetype
    ): Promise<Project> => {
        const { data: project } = await axios.put(
            appConfig.relocateIssueRoute(projectId),
            body,
            {
                headers: this.getAuthorizedHeaders(),
            }
        );
        return project;
    };
}
