import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";

export interface IColumnsApiService {
    editColumn(id: string, name: string, description: string): Promise<Column>;
    deleteColumn(columnId: string, projectId: string): Promise<void>;
    addIssue(
        columnId: string,
        issueIndex: number,
        issue: Issue
    ): Promise<Column>;
    getColumnIssues(columnId: string): Promise<Issue[]>;
}
