export const userPaths = {
    "/users/me": {
        get: {
            summary: "Get the current user using a JWT",
            tags: ["users"],
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
            tags: ["users", "projects"],
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
};

export const userDefinitions = {
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
};
