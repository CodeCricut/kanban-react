import { readColumnArray } from "../../../persistence/column/ColumnRepository";
import { readProject } from "../../../persistence/project/ProjectRepository";

type GetProjectsColumnsQuery = {
    projectId: string;
};

export async function getProjectsColumns({
    projectId,
}: GetProjectsColumnsQuery) {
    const project = await readProject(projectId);
    return readColumnArray(project.columns);
}
