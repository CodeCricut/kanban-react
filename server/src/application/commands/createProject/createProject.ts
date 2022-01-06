import { createProject as createProjectInDb } from "../../../persistence/project/ProjectRepository";
import { PostProjectDto } from "../../contracts/project";

type CreateProjectCommand = {
    name: string;
    description: string;
    createdAt: string;
};

export async function createProject(command: CreateProjectCommand) {
    const postDto: PostProjectDto = command;
    const created = await createProjectInDb(postDto);
    return created;
}
