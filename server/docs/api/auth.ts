export const authPaths = {
    "/auth/register": {
        post: {
            summary: "Register a new user",
            tags: ["authorization"],
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

export const authDefinitions = {
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
};

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
