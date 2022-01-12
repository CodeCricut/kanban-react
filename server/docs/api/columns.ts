export const columnsPaths = {};

export const columnDefinitions = {
    createColumnBody: {
        type: "object",
        required: ["columnIndex", "name"],
        properties: {
            columnIndex: {
                type: "number",
                description:
                    "The index to insert the new column to the project's columns",
            },
            name: {
                type: "string",
                description: " The name of the new column",
            },
            description: {
                type: "string",
                description: " The name of the new column",
            },
        },
    },
    editColumnBody: {
        type: "object",
        required: ["name", "description"],
        properties: {
            name: {
                type: "string",
            },
            description: {
                type: "string",
            },
        },
    },

    columnResponse: {
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
                    type: "string",
                },
            },
        },
    },
};
