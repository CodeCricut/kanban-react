import { readColumnArray } from "../../persistence/project/ColumnRepository";
import { getProjectById } from "../../persistence/repository/ProjectRepository";

type GetProjectsColumnsQuery = {
    projectId: string;
};

export async function handleGetProjectsColumnsQuery({
    projectId,
}: GetProjectsColumnsQuery) {
    const project = await getProjectById(projectId);
    return readColumnArray(project.columns);
}
