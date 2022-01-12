export const issuesPaths = {};

export const issueDefinitions = {
    Issue: {
        type: "object",
        required: ["id", "name", "createdAt"],
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
        },
    },
};
