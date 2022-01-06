import { deleteProject as deleteProjectFromDb } from "../../persistence/project/ProjectRepository";

type DeleteProjectCommand = {
    id: string;
};

export async function handleDeleteProjectCommand(
    command: DeleteProjectCommand
) {
    await deleteProjectFromDb(command.id);
}
