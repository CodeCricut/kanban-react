export const columnsPaths = {};

export const columnDefinitions = {
    Column: {
        type: "object",
        required: ["id", "name", "createdAt", "issues"],
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
            issues: {
                type: "array",
                items: {
                    $ref: "#/definitions/Issue",
                },
            },
        },
    },
};
