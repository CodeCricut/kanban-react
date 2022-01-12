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
    ServerErrorResponse: {
        description: "Server error",
        schema: {
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
