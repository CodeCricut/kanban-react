import { Issue } from "./issue";

export type Column = {
    id: string;
    name: string;
    description: string;
    issues: Issue[];
    createdAt: string;
};
