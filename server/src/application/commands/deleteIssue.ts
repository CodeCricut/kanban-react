import { deleteProjectIssue, findIssueInProject } from "../../domain/project";
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

type DeleteIssueCommand = {
    userId: string;
    projectId: string;
    issueId: string;
};
export async function handleDeleteIssueCommand(command: DeleteIssueCommand) {
    const { userId, projectId, issueId } = command;

    // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before deleting issue."
        );
    }

    // Ensure is is authorized to edit project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to delete issue of project you do not own."
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

    // Delete issue
    project = deleteProjectIssue(project, issue);

    // Update project
    project = await updateProject(projectId, project);

    // Return updated project
    return mapToGetProjectDto(project);
}
