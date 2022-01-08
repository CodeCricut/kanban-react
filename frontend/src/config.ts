import axios from "axios";

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = `http://localhost:3001/api`;
} else if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = `api`;
}

axios.defaults.headers.post["Content-Type"] = "application/json";

export type AppConfig = {
    projectsRoute: string;
    createProjectRoute: string;
    getAllProjectsRoute: string;
    editProjectRoute: (id: string) => string;
    deleteProjectRoute: (id: string) => string;
    addColumnToProjectRoute: (projectId: string) => string;
    getProjectColumnsRoute: (projectId: string) => string;
    editColumnRoute: (columnId: string) => string;
    deleteColumnRoute: (id: string, projectId: string) => string;
    reorderColumnRoute: (
        projectId: string,
        columnid: string,
        newIndex: number
    ) => string;
    addIssueRoute: (columnId: string) => string;
    getColumnIssuesRoute: (columnId: string) => string;
    editIssueRoute: (issueId: string) => string;
    deleteIssueRoute: (id: string, columnId: string) => string;
    relocateIssueRoute: (id: string) => string;
};

const projectsRoute = "/projects";
const createProjectRoute = `${projectsRoute}/create`;
const getAllProjectsRoute = "/projects";
const editProjectRoute = (id: string) => `/projects/edit/${id}`;
const deleteProjectRoute = (id: string) => `/projects/delete/${id}`;
const addColumnToProjectRoute = (projectId: string) =>
    `/projects/add-column/${projectId}`;
const getProjectColumnsRoute = (projectId: string) =>
    `/projects/columns/${projectId}`;

const editColumnRoute = (columnId: string) => `/columns/edit/${columnId}`;
const deleteColumnRoute = (id: string, projectId: string) =>
    `/columns/delete/${id}?projectId=${projectId}`;
const reorderColumnRoute = (
    projectId: string,
    columnId: string,
    newIndex: number
) =>
    `/projects/reorder-column/${projectId}?columnId=${columnId}&newIndex=${newIndex}`;
const addIssueRoute = (columnId: string) => `/columns/add-issue/${columnId}`;
const getColumnIssuesRoute = (columnId: string) =>
    `/columns/issues/${columnId}`;
const editIssueRoute = (issueId: string) => `/issues/edit/${issueId}`;
const deleteIssueRoute = (id: string, columnId: string) =>
    `/issues/delete/${id}?columnId=${columnId}`;
const relocateIssueRoute = (id: string) => `/issues/relocate/${id}`;

export const appConfig: AppConfig = {
    projectsRoute,
    createProjectRoute,
    getAllProjectsRoute,
    editProjectRoute,
    deleteProjectRoute,
    addColumnToProjectRoute,
    getProjectColumnsRoute,
    editColumnRoute,
    deleteColumnRoute,
    reorderColumnRoute,
    addIssueRoute,
    getColumnIssuesRoute,
    editIssueRoute,
    deleteIssueRoute,
    relocateIssueRoute,
};
