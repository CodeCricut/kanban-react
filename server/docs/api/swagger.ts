import { authDefinitions, authParams, authPaths, authResponses } from "./auth";
import { columnDefinitions, columnsPaths } from "./columns";
import { issueDefinitions, issuesPaths } from "./issues";
import {
    projectDefinitions,
    projectParameters,
    projectResponses,
    projectsPaths,
} from "./projects";
import { sharedDefinitions, sharedParameters, sharedResponses } from "./shared";
import { userDefinitions, userPaths, userResponses } from "./users";
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
    schemes: ["https"],
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
        ...sharedDefinitions,
    },
    parameters: {
        ...sharedParameters,
        ...authParams,
        ...projectParameters,
    },
    responses: {
        ...sharedResponses,
        ...authResponses,
        ...userResponses,
        ...projectResponses,
    },
};
