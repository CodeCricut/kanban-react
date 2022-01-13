import { editIssue } from "../../domain/issue";
import { findIssueInProject, updateProjectIssue } from "../../domain/project";
import { User } from "../../domain/user";
import {
    getProjectById,
    updateProject,
} from "../../persistence/repository/ProjectRepository";
import { getUserById } from "../../persistence/repository/UserRepository";
import { mapToGetProjectDto } from "../contracts/project";
import {
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
} from "../errors";

type EditIssueCommand = {
    userId: string;
    projectId: string;
    issueId: string;
    name: string;
    description?: string;
};
export async function handleEditIssueCommand(command: EditIssueCommand) {
    const { userId, projectId, issueId, name, description } = command;

    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before creating new projects."
        );
    }

    // Ensure user is authorized to edit project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to edit issue of project you do not own."
        );
    }

    // Get project
    let project = await getProjectById(projectId);
    if (!project) throw new NotFoundError("Project not found.");

    // Get issue
    let issue = findIssueInProject(project, issueId);
    if (!issue) {
        throw new NotFoundError(
            `Issue with id ${issueId} not found in project.`
        );
    }

    // Update issue
    issue = editIssue(issue, name, description);

    // Update column + project
    project = updateProjectIssue(project, issue);
    project = await updateProject(projectId, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
