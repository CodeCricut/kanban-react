import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";

export interface IIssuesApiService {
    editIssue(id: string, name: string, description: string): Promise<Issue>;
    deleteIssue(id: string, columnId: string): Promise<void>;
    relocateIssue(
        issueId: string,
        oldColumnId: string,
        newColumnId: string,
        newIndex: number
    ): Promise<Column>;
}
