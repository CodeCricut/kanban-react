import { createProject as createProjectInDb } from "../../persistence/project/ProjectRepository";
import { readPrivateUser } from "../../persistence/user/UserRepository";
import { PostProjectDto } from "../contracts/project";

type CreateProjectCommand = {
    name: string;
    description: string;
    createdAt: string;
    userId: string;
};

export async function handleCreateProjectCommand(
    command: CreateProjectCommand
) {
    const user = await readPrivateUser(command.userId);
    if (!user)
        throw new Error(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );

    const postDto: PostProjectDto = command;
    const created = await createProjectInDb(postDto);

    user.ownedProjects.splice(0, 0, created.id);
    await updateUser(user.id, user);

    return created;
}
