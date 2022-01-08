import { IIssuesApiService } from "../contracts/issuesApiService";
import { IStaleColumnService } from "../contracts/staleColumnService";

type Dependencies = {
    issuesApiService: IIssuesApiService;
    staleColumnService: IStaleColumnService;
};

export async function relocateIssue(
    issueId: string,
    oldColumnId: string,
    newColumnId: string,
    newIndex: number,
    dependencies: Dependencies
) {
    const { issuesApiService, staleColumnService } = dependencies;

    const updatedNewColumn = await issuesApiService.relocateIssue(
        issueId,
        oldColumnId,
        newColumnId,
        newIndex
    );

    // Make new and old columns stale
    staleColumnService.addStaleColumn(oldColumnId);
    if (oldColumnId != newColumnId) {
        staleColumnService.addStaleColumn(newColumnId);
    }

    return updatedNewColumn;
}
