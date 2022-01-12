import { authDefinitions, authPaths } from "./auth";
import { columnDefinitions, columnsPaths } from "./columns";
import { issueDefinitions, issuesPaths } from "./issues";
import { projectDefinitions, projectsPaths } from "./projects";
import { sharedResponses } from "./shared";
import { userDefinitions, userPaths } from "./users";
export default {
    swagger: "2.0",
    info: {
        description: "API for the MERN Kanban project.",
        version: "1.0.0",
        title: "Kanban API",
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    schemes: ["http"],
    basePath: "/api",
    paths: {
        ...authPaths,
        ...userPaths,
        ...projectsPaths,
        ...columnsPaths,
        ...issuesPaths,
    },
    definitions: {
        ...authDefinitions,
        ...projectDefinitions,
        ...columnDefinitions,
        ...issueDefinitions,
        ...userDefinitions,
    },
    responses: {
        ...sharedResponses,
    },
};
