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
};

const projectsRoute = "/projects";
const createProjectRoute = `${projectsRoute}/create`;
const getAllProjectsRoute = "/projects";

export const appConfig: AppConfig = {
    projectsRoute,
    createProjectRoute,
    getAllProjectsRoute,
};
