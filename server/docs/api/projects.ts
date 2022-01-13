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
