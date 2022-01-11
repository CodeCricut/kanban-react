import { readAllProjects } from "../../persistence/repository/ProjectRepository";

type GetAllProjectsQuery = {};
export async function handleGetAllProjectsQuery(
    query: GetAllProjectsQuery = {}
) {
    return await readAllProjects();
}
