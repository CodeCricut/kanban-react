export const projectsPaths = {
    "/projects/create": {
        post: {
            summary: "Create a new project",
            tags: ["projects"],
            description:
                "Create a project with the given name, description, and creation date.",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/NewProjectParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/edit/{id}": {
        put: {
            summary: "Update the project info",
            description: "Edit the project's name and description",
            tags: ["projects"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/EditProjectParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/delete/{id}": {
        delete: {
            summary: "Delete a project",
            description: "Remove a project from the database",
            tags: ["projects"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/DeletedProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/add-column/{id}": {
        post: {
            summary: "Add a column to the project",
            description:
                "Add a new column and associate it with the given project",
            tags: ["projects", "columns"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/AddColumnParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/relocate-column/{id}": {
        put: {
            summary: "Relocate a column within the project",
            tags: ["projects", "columns"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/RelocateColumnParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },

    "/projects/edit-column/{id}": {
        put: {
            summary: "Update a column's info",
            description:
                "Edit a column's name and description which belongs to the project.",
            tags: ["projects", "columns"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/EditColumnParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/delete-column/{id}": {
        delete: {
            summary: "Delete a column",
            description:
                "Remove a column (and its issues) from the project permanently.",
            tags: ["projects", "columns"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/DeleteColumnParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },

    "/projects/add-issue/{id}": {
        post: {
            summary: "Add an issue to the project",
            description:
                "Add a new issue and associate it with the given project",
            tags: ["projects", "issues"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/AddIssueParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },

    "/projects/edit-issue/{id}": {
        put: {
            summary: "Update an issue's info",
            description:
                "Edit an issue's name and description which belongs to the project.",
            tags: ["projects", "issues"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/EditIssueParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/projects/delete-issue/{id}": {
        delete: {
            summary: "Delete an issue",
            description: "Remove an issue from the project permanently.",
            tags: ["projects", "issues"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/DeleteIssueParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },

    "/projects/relocate-issue/{id}": {
        put: {
            summary: "Relocate an issue within the project",
            tags: ["projects", "issues"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
                { $ref: "#/parameters/JwtParameter" },
                { $ref: "#/parameters/ProjectIdParameter" },
                { $ref: "#/parameters/RelocateIssueParameter" },
            ],
            responses: {
                200: {
                    $ref: "#/responses/ProjectResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                403: {
                    $ref: "#/responses/NotAuthorizedErrorResponse",
                },
                404: {
                    $ref: "#/responses/NotFoundErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    }
};

export const projectParameters = {
    NewProjectParameter: {
        in: "body",
        name: "body",
        description: "Project object",
        required: true,
        schema: {
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
    },
    RelocateColumnParameter: {
        in: "body",
        name: "body",
        required: true,
        schema: {
            type: "object",
            required: ["columnId", "newIndex"],
            properties: {
                columnId: {
                    type: "string",
                },
                newIndex: {
                    type: "number",
                },
            },
        },
    },
    ProjectIdParameter: {
        name: "id",
        in: "path",
        description: "The id of the project",
        required: true,
        type: "string",
    },
    EditProjectParameter: {
        in: "body",
        name: "body",
        description: "Update object",
        required: true,
        schema: {
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
    },
    DeleteIssueParameter: {
        in: "path",
        name: "issueId",
        required: true,
        schema: {
            type: "string",
        },
    },
    AddColumnParameter: {
        in: "body",
        name: "body",
        description: "The column to add.",
        required: true,
        schema: {
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
    },
    DeleteColumnParameter: {
        in: "path",
        name: "columnId",
        required: true,
        schema: {
            type: "string",
        },
    },
    EditColumnParameter: {
        in: "body",
        name: "body",
        description: "Update object",
        required: true,
        schema: {
            type: "object",
            required: ["columnId", "name", "description"],
            properties: {
                columnId: {
                    type: "string",
                    description: "The id of the column to update.",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
    },
    AddIssueParameter: {
        in: "body",
        name: "body",
        description: "The issue to add.",
        required: true,
        schema: {
            type: "object",
            required: ["columnId", "issueIndex", "name"],
            properties: {
                columnId: {
                    type: "string",
                    description:
                        "The id of the parent column to the new issue.",
                },
                issueIndex: {
                    type: "number",
                    description:
                        "The index to insert the new issue into the column.",
                },
                name: {
                    type: "string",
                    description: " The name of the new issue.",
                },
                description: {
                    type: "string",
                    description: " The name of the new issue.",
                },
            },
        },
    },
    EditIssueParameter: {
        in: "body",
        name: "body",
        description: "Update object",
        required: true,
        schema: {
            type: "object",
            required: ["issueId", "name", "description"],
            properties: {
                issueId: {
                    type: "string",
                    description: "The id of the issue to update.",
                },
                name: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
            },
        },
    },
     RelocateIssueParameter: {
        in: "body",
        name: "body",
        required: true,
        schema: {
            type: "object",
            required: ["issueId", "newColumnId", "newIndex"],
            properties: {
                issueId: {
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
};

export const projectDefinitions = {
    Project: {
        type: "object",
        required: ["id", "name", "createdAt", "users"],
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
                    $ref: "#/definitions/Column",
                },
            },
            users: {
                type: "array",
                items: {
                    definition: "The user id",
                    type: "string",
                },
            },
        },
    },
};

export const projectResponses = {
    ProjectResponse: {
        description: "The project which was returned.",
        schema: {
            $ref: "#/definitions/Project",
        },
    },
    DeletedProjectResponse: {
        description: "Successfully deleted project",
    },
};
