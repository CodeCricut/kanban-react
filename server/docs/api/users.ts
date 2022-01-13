export const userPaths = {
    "/users/me": {
        get: {
            summary: "Get the current user using a JWT",
            tags: ["users"],
            produces: ["application/json"],
            parameters: [{ $ref: "#/parameters/JwtParameter" }],
            responses: {
                200: {
                    $ref: "#/responses/PrivateUserResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
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
            parameters: [{ $ref: "#/parameters/JwtParameter" }],
            responses: {
                200: {
                    $ref: "#/responses/UserProjectsResponse",
                },
                401: {
                    $ref: "#/responses/NotAuthenticatedErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
};

export const userDefinitions = {
    PrivateUser: {
        type: "object",
        required: ["id", "username", "email", "createdAt", "projects"],
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
                    description: "The project id.",
                    type: "string",
                },
            },
        },
    },
};

export const userResponses = {
    PrivateUserResponse: {
        description: "Successfully retrieved user.",
        schema: {
            type: "object",
            $ref: "#/definitions/PrivateUser",
        },
    },
    UserProjectsResponse: {
        description: "Successfully retrieved user's projects.",
        schema: {
            type: "array",
            items: {
                $ref: "#/definitions/Project",
            },
        },
    },
};
