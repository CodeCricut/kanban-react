import {
    readProject,
    updateProject,
} from "../../persistence/project/ProjectRepository";
import { UpdateProjectDto } from "../contracts/project";

type EditProjectCommand = {
    id: string;
    name: string;
    description: string;
};

export async function handleEditProjectCommand(command: EditProjectCommand) {
    const existingProject = await readProject(command.id);

    const updateDto: UpdateProjectDto = {
        name: command.name,
        description: command.description,
        columns: existingProject.columns,
    };

    return await updateProject(command.id, updateDto);
}
