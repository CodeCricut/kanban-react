import { IIssuesApiService } from "../contracts/issuesApiService";
import { IStaleColumnService } from "../contracts/staleColumnService";

type Dependencies = {
    issuesApiService: IIssuesApiService;
    staleColumnsService: IStaleColumnService;
};

export async function editIssue(
    id: string,
    name: string,
    description: string,
    columnId: string,
    dependencies: Dependencies
) {
    const { issuesApiService, staleColumnsService } = dependencies;
    // Update issue with api
    const updatedIssue = await issuesApiService.editIssue(
        id,
        name,
        description
    );

    // Make column stale so issues are reloaded
    staleColumnsService.addStaleColumn(columnId);

    return updatedIssue;
}
