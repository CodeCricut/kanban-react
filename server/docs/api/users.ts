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
                        $ref: "#/definitions/PrivateUserResponse",
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
    PrivateUserResponse: {
        type: "object",
        required: ["id", "username", "email", "createdAt"],
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
            createdAt: {
                type: "string",
                format: "date-time",
            },
            projects: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
    },
};
