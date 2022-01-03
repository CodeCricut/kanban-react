import { Project, updateProject } from "../../domain/project";
import { IColumnsApiService } from "../contracts/columnsApiService";
import { IProjectsStorageService } from "../contracts/projectsStorage";
import { IStaleProjectService } from "../contracts/staleProjectService";

type Dependencies = {
    columnsApiService: IColumnsApiService;
    staleProjectService: IStaleProjectService;
};

export async function editColumn(
    id: string,
    name: string,
    description: string,
    projectId: string,
    dependencies: Dependencies
) {
    const { columnsApiService: columnsApiServce, staleProjectService } =
        dependencies;

    // Update column with api
    const updatedColumn = await columnsApiServce.editColumn(
        id,
        name,
        description
    );

    // Make project stale so columns are reloaded
    staleProjectService.addStaleProject(projectId);

    // Return updated column
    return updatedColumn;
}
