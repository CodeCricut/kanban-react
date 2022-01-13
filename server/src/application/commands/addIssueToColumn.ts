import { addIssueToColumn } from "../../domain/column";
import { createIssue } from "../../domain/issue";
import { findColumnInProject, updateProjectColumn } from "../../domain/project";
import { User } from "../../domain/user";
import { getCurrentDateTimeString } from "../../library/dates";
import {
    getProjectById,
    updateProject,
} from "../../persistence/repository/ProjectRepository";
import { getUserById } from "../../persistence/repository/UserRepository";
import { GetProjectDto, mapToGetProjectDto } from "../contracts/project";
import {
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
} from "../errors";

type AddIssueToColumnCommand = {
    userId: string;
    projectId: string;
    columnId: string;
    issueIndex: number;
    name: string;
    description?: string;
};
export async function handleAddIssueToColumnCommand(
    command: AddIssueToColumnCommand
): Promise<GetProjectDto> {
    const { userId, projectId, columnId, issueIndex, name, description } =
        command;

    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError();
    }

    // Make sure user is authorized to modify project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to add issue to project you don't own."
        );
    }

    // Get project
    let project = await getProjectById(projectId);
    if (!project) {
        throw new NotFoundError(
            `Couldn't find project with id ${command.projectId}`
        );
    }

    // Get column
    const column = findColumnInProject(project, columnId);
    if (!column) {
        throw new NotFoundError(
            `Column with id ${columnId} not found in project.`
        );
    }

    // Create new issue object
    const createdAt = getCurrentDateTimeString();
    const issue = createIssue(name, description, createdAt);

    // Add issue to column
    const updatedColumn = addIssueToColumn(column, issue, issueIndex);

    // Update project/column with new issue
    project = updateProjectColumn(project, updatedColumn);
    console.dir(project);
    project = await updateProject(projectId, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
