import { IIssuesApiService } from "../contracts/issuesApiService";
import { IStaleColumnService } from "../contracts/staleColumnService";

type Dependencies = {
    issuesApiService: IIssuesApiService;
    staleColumnsService: IStaleColumnService;
};

export async function deleteIssue(
    issueId: string,
    columnId: string,
    dependencies: Dependencies
) {
    const { issuesApiService, staleColumnsService } = dependencies;

    // Delete issue with api
    await issuesApiService.deleteIssue(issueId, columnId);

    // Force refresh of column
    staleColumnsService.addStaleColumn(columnId);
}
