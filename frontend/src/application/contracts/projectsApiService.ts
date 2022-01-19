import { Column } from "../../domain/column";
import { Project } from "../../domain/project";

export type CreateProjectBody = {
    name: string;
    description?: string;
};
export type EditProjectBody = CreateProjectBody;

export type AddColumnBody = {
    columnIndex: number;
    name: string;
    description?: string;
};

export type RelocateColumnBody = {
    columnId: string;
    newIndex: number;
};

export type EditColumnBody = {
    columnId: string;
    name: string;
    description?: string;
};

export type AddIssueBody = {
    columnId: string;
    issueIndex: number;
    name: string;
    description?: string;
};

export type EditIssueBody = {
    issueId: string;
    name: string;
    description?: string;
};

export type RelocateIssuetype = {
    issueId: string;
    newColumnId: string;
    newIndex: number;
};


/**
 * Interface for interacting with the projects api (the api routes which are prefixed by `/api/projects`).
 */
export interface IProjectsApiService {
    // Projects
    createProject(body: CreateProjectBody): Promise<Project>;
    editProject(id: string, body: EditProjectBody): Promise<Project>;
    deleteProject(id: string): Promise<void>;

    // Columns
    addColumn(projectId: string, body: AddColumnBody): Promise<Project>;
    relocateColumn(
        projectId: string,
        body: RelocateColumnBody
    ): Promise<Project>;
    editColumn(projectId: string, body: EditColumnBody): Promise<Project>;
    deleteColumn(projectId: string, columnId: string): Promise<Project>;

    // Issues
    addIssue(projectId: string, body: AddIssueBody): Promise<Project>;
    editIssue(projectId: string, body: EditIssueBody): Promise<Project>;
    deleteIssue(projectId: string, issueId: string): Promise<Project>;
    relocateIssue(projectId: string, body: RelocateIssuetype): Promise<Project>;
}
