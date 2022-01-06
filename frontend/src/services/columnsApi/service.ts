import axios from "axios";
import { IColumnsApiService } from "../../application/contracts/columnsApiService";
import { AppConfig } from "../../config";
import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";

export class ColumnsApiService implements IColumnsApiService {
    constructor(private _config: AppConfig) {}

    editColumn = async (
        id: string,
        name: string,
        description: string
    ): Promise<Column> => {
        const requestBody = {
            name,
            description,
        };
        const response = await axios.put(
            this._config.editColumnRoute(id),
            requestBody
        );
        const returnedColumn: Column = response.data;
        return returnedColumn;
    };

    deleteColumn = async (
        columnId: string,
        projectId: string
    ): Promise<void> => {
        const route = this._config.deleteColumnRoute(columnId, projectId);
        await axios.delete(route);
    };

    addIssue = async (
        columnId: string,
        issueIndex: number,
        issue: Issue
    ): Promise<Column> => {
        const route = this._config.addIssueRoute(columnId);
        const requestBody = {
            issueIndex,
            name: issue.name ?? "",
            description: issue.description,
            createdAt: issue.createdAt ?? "",
        };

        const response = await axios.post(route, requestBody);
        const returnedColumn: Column = response.data;
        return returnedColumn;
    };
}
