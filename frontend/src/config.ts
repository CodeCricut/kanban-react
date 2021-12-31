import axios from "axios";

axios.defaults.baseURL = `api`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export type AppConfig = {
    projectsRoute: string;
    createProjectRoute: string;
};

const projectsRoute = "/projects";
const createProjectRoute = `${projectsRoute}/create`;

export const appConfig: AppConfig = {
    projectsRoute,
    createProjectRoute,
};
