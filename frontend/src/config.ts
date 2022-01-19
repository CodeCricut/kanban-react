import axios from "axios";

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = `http://localhost:3001/api`;
} else if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = `api`;
}

axios.defaults.headers.post["Content-Type"] = "application/json";

export const appConfig = {
    registerRoute: "/auth/register",
    loginRoute: "/auth/login",

    getMeRoute: "/users/me",
    getMyProjectsRoute: "/users/me/projects",

    projectsRout: "/projects",
    createProjectRoute: "/projects/create",
    editProjectRoute: (projectId: string) => `/projects/edit/${projectId}`,
    deleteProjectRoute: (projectId: string) => `/projects/delete/${projectId}`,
    addColumnRoute: (projectId: string) => `/projects/add-column/${projectId}`,
    relocateColumnRoute: (projectId: string) =>
        `/projects/relocate-column/${projectId}`,
    editColumnRoute: (projectId: string) =>
        `/projects/edit-column/${projectId}`,
    deleteColumnRoute: (projectId: string, columnId: string) =>
        `/projects/delete/${projectId}?columnId=${columnId}`,
    addIssueRoute: (projectId: string) => `/projects/add-issue/${projectId}`,
    editIssueRoute: (projectId: string) => `/projects/edit-issue/${projectId}`,
    deleteIssueRoute: (projectId: string, issueId: string) =>
        `/projects/delete-issue/${projectId}?issueId=${issueId}`,
    relocateIssueRoute: (projectId: string) =>
        `/projects/relocate-issue/${projectId}`,
};
