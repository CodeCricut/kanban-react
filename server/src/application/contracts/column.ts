import { GetIssueDto } from "./issue";

export type GetColumnDto = {
    id: string;
    name: string;
    description?: string;
    issues: GetIssueDto[];
    createdAt: string;
};

export type PostColumnDto = {
    name: string;
    description?: string;
    createdAt: string;
};

// export type UpdateColumnDto = {
//     name: string;
//     description?: string;
//     issues: string[];
// };
