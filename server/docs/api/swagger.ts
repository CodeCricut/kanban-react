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
        "/auth/register": {
            post: {
                summary: "Register a new user",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "New user object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/registerUserBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "object",
                            required: ["jwt"],
                            properties: {
                                jwt: {
                                    type: "string",
                                    description:
                                        "The JWT token for future authenticated requests for the new user.",
                                },
                            },
                        },
                        400: {
                            description: "Invalid request",
                            schema: {
                                $ref: "#/definitions/InvalidResponse",
                            },
                        },
                    },
                },
            },
        },
        "/auth/login": {
            post: {
                summary: "Login an existing user",
                description: "Get the JWT for an existing user",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Login object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/loginUserBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "object",
                            required: ["jwt"],
                            properties: {
                                jwt: {
                                    type: "string",
                                    description:
                                        "The JWT token for future authenticated requests for the new user.",
                                },
                            },
                        },
                        400: {
                            description: "Invalid request",
                            schema: {
                                $ref: "#/definitions/InvalidResponse",
                            },
                        },
                    },
                },
            },
        },

        "/users/me": {
            get: {
                summary: "Get the current user using a JWT",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "header",
                        name: "token",
                        description:
                            "The JWT containing information about the user.",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "object",
                            $ref: "#/definitions/privateUserResponse",
                        },
                        400: {
                            description: "Invalid request",
                            schema: {
                                $ref: "#/definitions/InvalidResponse",
                            },
                        },
                    },
                },
            },
        },
        "/users/me/projects": {
            get: {
                summary: "Get all your projects",
                description:
                    "Get the projects of the user associated with the query.",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "header",
                        name: "token",
                        description:
                            "The JWT containing information about the user.",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/projectResponse",
                            },
                        },
                    },
                },
            },
        },
        "/projects/create": {
            post: {
                summary: "Create a new project",
                description:
                    "Create a project with the given name, description, and creation date.",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        in: "header",
                        name: "token",
                        description:
                            "The JWT containing information about the user.",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Project object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/projectBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/projectResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/projects/edit/{id}": {
            put: {
                summary: "Update the project info",
                description: "Edit the project's name and description",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Project id that needs to be updated",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Update object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/editProjectBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/projectResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/projects/delete/{id}": {
            delete: {
                summary: "Delete a project",
                description: "Remove a project from the database",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Project id that needs to be deleted",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/projects/add-column/{id}": {
            post: {
                summary: "Add a column to the project",
                description:
                    "Add a new column and associate it with the given project",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        in: "header",
                        name: "token",
                        description:
                            "The JWT containing information about the user.",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "id",
                        in: "path",
                        description:
                            "The id of the project to associate with the new column",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Column object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/createColumnBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/projectResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/projects/columns/{id}": {
            get: {
                summary: "Get all columns for a project",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description:
                            "The id of the project to retrieve the columns of",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/columnResponse",
                            },
                        },
                    },
                },
            },
        },
        "/projects/reorder-column/{id}": {
            put: {
                summary: "Reorder the columns of a project",
                description:
                    "Move the column with the given id to the right. Must not be the last column in the project's project.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description:
                            "The id of the project to reorder the column's of.",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "query",
                        name: "columnId",
                        description: "The column to move right.",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        in: "query",
                        name: "newIndex",
                        description: "The new index to position the column at.",
                        required: true,
                        schema: {
                            type: "number",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/projectResponse",
                            },
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/columns/edit/{id}": {
            put: {
                summary: "Update the column info",
                description: "Edit the column's name and description",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Column id that needs to be updated",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Update object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/editColumnBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/columnResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/columns/delete/{id}": {
            delete: {
                summary: "Delete a column",
                description: "Remove a column from the database",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Column id that needs to be deleted",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "query",
                        name: "projectId",
                        description: "Parent project object",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/columns/add-issue/{id}": {
            post: {
                summary: "Add a issue to the column",
                description:
                    "Add a new issue and associate it with the given column",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description:
                            "The id of the column to associate with the new issue",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Issue object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/createIssueBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/columnResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/issues/delete/{id}": {
            delete: {
                summary: "Delete a issue",
                description: "Remove a issue from the database",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Issue id that needs to be deleted",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "query",
                        name: "columnId",
                        description: "Parent column id",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
        "/issues/edit/{id}": {
            put: {
                summary: "Update the issue info",
                description: "Edit the issue's name and description",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Issue id that needs to be updated",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Update object",
                        required: true,
                        schema: {
                            type: "object",
                            $ref: "#/definitions/editIssueBody",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/issueResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },

        "/issues/relocate/{id}": {
            put: {
                summary: "Relocate an issue",
                description:
                    "Relocate an issue within the current column, or to a new column and index.",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "The id of the issue to relocate",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        description: "Update object",
                        required: true,
                        schema: {
                            type: "object",
                            required: [
                                "oldColumnId",
                                "newColumnId",
                                "newIndex",
                            ],
                            properties: {
                                oldColumnId: {
                                    type: "string",
                                },
                                newColumnId: {
                                    type: "string",
                                },
                                newIndex: {
                                    type: "number",
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful operation",
                        schema: {
                            $ref: "#/definitions/columnResponse",
                        },
                    },
                    400: {
                        description: "Invalid request",
                        schema: {
                            $ref: "#/definitions/InvalidResponse",
                        },
                    },
                },
            },
        },
    },
    definitions: {
        jwtHeader: {},
        registerUserBody: {
            type: "object",
            required: ["username", "email", "password"],
            properties: {
                username: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
        },
        loginUserBody: {
            type: "object",
            required: ["username", "password"],
            properties: {
                username: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
        },
        projectBody: {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
        createColumnBody: {
            type: "object",
            required: ["columnIndex", "name"],
            properties: {
                columnIndex: {
                    type: "number",
                    description:
                        "The index to insert the new column to the project's columns",
                },
                name: {
                    type: "string",
                    description: " The name of the new column",
                },
                description: {
                    type: "string",
                    description: " The name of the new column",
                },
            },
        },
        createIssueBody: {
            type: "object",
            required: ["issueIndex", "name"],
            properties: {
                issueIndex: {
                    type: "number",
                    description:
                        "The index to insert the new issue to the columns's issues",
                },
                name: {
                    type: "string",
                    description: " The name of the new issue",
                },
                description: {
                    type: "string",
                    description: " The name of the new issue",
                },
            },
        },
        editIssueBody: {
            type: "object",
            required: ["name", "description"],
            properties: {
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
        editProjectBody: {
            type: "object",
            required: ["name", "description"],
            properties: {
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
        editColumnBody: {
            type: "object",
            required: ["name", "description"],
            properties: {
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
        projectResponse: {
            type: "object",
            required: ["id", "name", "createdAt", "columns"],
            properties: {
                id: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
                columns: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
        },
        columnResponse: {
            type: "object",
            required: ["id", "name", "createdAt", "issues"],
            properties: {
                id: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
                issues: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
        },
        issueResponse: {
            type: "object",
            required: ["id", "name", "createdAt"],
            properties: {
                id: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
            },
        },
        InvalidResponse: {
            type: "object",
            properties: {
                statusCode: {
                    type: "string",
                },
                message: {
                    type: "string",
                },
            },
        },
        privateUserResponse: {
            type: "object",
            required: [
                "id",
                "username",
                "email",
                "passwordHash",
                "createdAt",
                "ownedProjects",
                "ownedColumns",
                "ownedIssues",
            ],
            properties: {
                id: {
                    type: "string",
                },
                username: {
                    type: "string",
                },
                email: {
                    type: "string",
                    format: "email",
                },
                passwordHash: {
                    type: "string",
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
                ownedProjects: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                ownedColumns: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                ownedIssues: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
        },
    },
};
