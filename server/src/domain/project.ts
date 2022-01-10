import { Column } from "./column";

export type Project = {
    id: string;
    users: string[];
    name: string;
    description?: string;
    columns: Column[];
    createdAt: string;
};
