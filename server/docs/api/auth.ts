export const authPaths = {
    "/auth/register": {
        post: {
            summary: "Register a new user",
            tags: ["authorization"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [{ $ref: "#/parameters/RegisterParameter" }],
            responses: {
                200: {
                    $ref: "#/responses/JwtResponse",
                },
                400: {
                    $ref: "#/responses/ValidationErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
    "/auth/login": {
        post: {
            summary: "Login an existing user",
            description: "Get the JWT for an existing user",
            tags: ["authorization"],
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [{ $ref: "#/parameters/LoginParameter" }],
            responses: {
                200: {
                    $ref: "#/responses/JwtResponse",
                },
                400: {
                    $ref: "#/responses/ValidationErrorResponse",
                },
                500: {
                    $ref: "#/responses/ServerErrorResponse",
                },
            },
        },
    },
};

export const authParams = {
    RegisterParameter: {
        in: "body",
        name: "body",
        description: "New user object",
        required: true,
        schema: {
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
    },
    LoginParameter: {
        in: "body",
        name: "body",
        description: "Login object",
        required: true,
        schema: {
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
    },
};

export const authDefinitions = {};

export const authResponses = {
    JwtResponse: {
        description: "JWT response",
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
    },
};
