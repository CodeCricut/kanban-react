import axios from "axios";
import { IIssuesApiService } from "../../application/contracts/issuesApiService";
import { AppConfig } from "../../config";
import { Issue } from "../../domain/issue";

export class IssuesApiService implements IIssuesApiService {
    constructor(private _config: AppConfig) {}

    editIssue = async (
        id: string,
        name: string,
        description: string
    ): Promise<Issue> => {
        const requestBody = {
            name,
            description,
        };
        const response = await axios.put(
            this._config.editIssueRoute(id),
            requestBody
        );
        const returnedIssue: Issue = response.data;
        return returnedIssue;
    };
}
