import { deleteProject as deleteProjectFromDb } from "../../../persistence/project/ProjectRepository";

type DeleteProjectCommand = {
    id: string;
};

export async function deleteProject(command: DeleteProjectCommand) {
    await deleteProjectFromDb(command.id);
}
