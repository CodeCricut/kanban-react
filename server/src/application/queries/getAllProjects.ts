import { readAllProjects } from "../../persistence/project/ProjectRepository";

type GetAllProjectsQuery = {};
export async function getAllProjects(query: GetAllProjectsQuery = {}) {
    return await readAllProjects();
}
