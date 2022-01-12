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
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
};

export const projectDefinitions = {
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
};
