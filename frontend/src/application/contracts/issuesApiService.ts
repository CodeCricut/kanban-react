import { Issue } from "../../domain/issue";

export interface IIssuesApiService {
    editIssue(id: string, name: string, description: string): Promise<Issue>;
}
