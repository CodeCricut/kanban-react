export const sharedParameters = {
    JwtParameter: {
        in: "header",
        name: "token",
        description:
            "The JWT which is used to authenticate and authorize the user to perform the operation.",
        required: true,
        schema: {
            type: "string",
        },
    },
};

export const sharedResponses = {
    NotAuthenticatedErrorResponse: {
        description: "Not authenticated.",
        schema: {
            $ref: "#/definitions/ErrorObject",
        },
    },
    NotAuthorizedErrorResponse: {
        description: "Not authorized.",
        schema: {
            $ref: "#/definitions/ErrorObject",
        },
    },
    NotFoundErrorResponse: {
        description: "Not found.",
        schema: {
            $ref: "#/definitions/ErrorObject",
        },
    },
    InvalidTokenErrorResponse: {
        description: "Invalid JWT in header.",
        schema: {
            $ref: "#/definitions/ErrorObject",
        },
    },
    ServerErrorResponse: {
        description: "Server error",
        schema: {
            $ref: "#/definitions/ErrorObject",
        },
    },
    ValidationErrorResponse: {
        description: "Error in request validation",
        schema: {
            type: "object",
            required: ["errors"],
            properties: {
                errors: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            value: {
                                type: "string",
                            },
                            msg: {
                                type: "string",
                            },
                            param: {
                                type: "string",
                            },
                            location: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const sharedDefinitions = {
    ErrorObject: {
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
};
