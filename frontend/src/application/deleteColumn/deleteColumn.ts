import { IColumnsApiService } from "../contracts/columnsApiService";
import { IStaleProjectService } from "../contracts/staleProjectService";

type Dependencies = {
    columnApiService: IColumnsApiService;
    staleProjectService: IStaleProjectService;
};

export async function deleteColumn(
    columnId: string,
    projectId: string,
    dependencies: Dependencies
) {
    const { columnApiService, staleProjectService } = dependencies;

    // Delete project with api
    await columnApiService.deleteColumn(columnId, projectId);

    // Force refresh of project
    staleProjectService.addStaleProject(projectId);
}
