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
