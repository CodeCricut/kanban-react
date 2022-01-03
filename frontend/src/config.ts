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

export const appConfig: AppConfig = {
    projectsRoute,
    createProjectRoute,
    getAllProjectsRoute,
    editProjectRoute,
    deleteProjectRoute,
    addColumnToProjectRoute,
    getProjectColumnsRoute,
};
