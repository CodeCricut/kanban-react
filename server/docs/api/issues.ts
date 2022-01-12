export const issuesPaths = {};

export const issueDefinitions = {
    createIssueBody: {
        type: "object",
        required: ["issueIndex", "name"],
        properties: {
            issueIndex: {
                type: "number",
                description:
                    "The index to insert the new issue to the columns's issues",
            },
            name: {
                type: "string",
                description: " The name of the new issue",
            },
            description: {
                type: "string",
                description: " The name of the new issue",
            },
        },
    },
    editIssueBody: {
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
    issueResponse: {
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
