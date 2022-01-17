import { findIssueInProject, findColumnInProject, relocateProjectIssue } from "../../domain/project";
import { User } from "../../domain/user";
import { getProjectById, updateProject } from "../../persistence/repository/ProjectRepository";
import { getUserById } from "../../persistence/repository/UserRepository";
import { mapToGetProjectDto } from "../contracts/project";
import { NotAuthenticatedError, NotAuthorizedError, NotFoundError } from "../errors";

type RelocateIssueCommand = {
    userId: string;
    projectId: string;
    issueId: string;
    newColumnId: string;
    newIndex: number;
}
export async function handleRelocateIssueCommand(command: RelocateIssueCommand){
    const {userId, projectId, issueId, newColumnId, newIndex} = command;

     // Get user
    let user: User | null = await getUserById(userId);
    if (!user) {
        throw new NotAuthenticatedError(
            "User could not be authenticated. Must be authenticated before relocating issue."
        );
    }

    // Ensure is is authorized to edit project
    if (!user.projects.includes(projectId)) {
        throw new NotAuthorizedError(
            "Not authorized to relocate issue of project you do not own."
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

    // Get new column
    const newColumn = findColumnInProject(project, newColumnId)
    if (!newColumn){
         throw new NotFoundError(
            `Column with id ${newColumnId} not found in project.`
        );
    }

    // Relocate issue
    project = relocateProjectIssue(project, issue.issueId, newColumnId, newIndex)

    // Update project
    project = await updateProject(projectId, project)

    // Return updated project
    return mapToGetProjectDto(project)
}