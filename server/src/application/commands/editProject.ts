import {
    getProjectById,
    updateProject,
} from "../../persistence/repository/ProjectRepository";
import { UpdateProjectDto } from "../contracts/project";

type EditProjectCommand = {
    id: string;
    name: string;
    description: string;
};

export async function handleEditProjectCommand(command: EditProjectCommand) {
    const existingProject = await getProjectById(command.id);

    const updateDto: UpdateProjectDto = {
        name: command.name,
        description: command.description,
        columns: existingProject.columns,
    };

    return await updateProject(command.id, updateDto);
}
