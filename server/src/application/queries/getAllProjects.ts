import { readAllProjects } from "../../persistence/project/ProjectRepository";

type GetAllProjectsQuery = {};
export async function handleGetAllProjectsQuery(
    query: GetAllProjectsQuery = {}
) {
    return await readAllProjects();
}
