import { NotFoundError } from "../application/errors";
import { Column } from "./column";
import { EntityNotInParentError, IndexOutOfBoundsError } from "./errors";
import { Issue } from "./issue";
import { User } from "./user";

export type Project = {
    id: string;
    users: string[];
    name: string;
    description?: string;
    columns: Column[];
    createdAt: string;
};

/**
 * Pure function for adding a project to the user's list of referenced projects.
 */
export function addUserToProject(
    user: User,
    project: Project,
    index: number = 0
): Project {
    // Copy the project so it is pure
    const updatedProject = copyProject(project);
    // Add the user id at the index
    updatedProject.users.splice(index, 0, user.id);
    return updatedProject;
}

/** Pure function for editing a project. */
export function editProject(
    project: Project,
    name: string,
    description?: string
) {
    // Copy the project so it is pure
    const updatedProject = copyProject(project);
    return {
        ...updatedProject,
        name,
        description,
    };
}

/**
 * Pure function for inserting column to project at the given index.
 */
export function addColumnToProject(
    project: Project,
    column: Column,
    columnIndex: number
) {
    if (project.columns.length < columnIndex || columnIndex < 0) {
        throw new IndexOutOfBoundsError(
            `Column index ${columnIndex} out of bounds.`
        );
    }

    // Copy proj to keep func pure
    const updatedProject = copyProject(project);
    updatedProject.columns.splice(columnIndex, 0, column);
    return updatedProject;
}

export function findColumnInProject(
    project: Project,
    columnId: string
): Column | undefined {
    return project.columns.find((col) => col.columnId == columnId);
}

export function findIssueInProject(
    project: Project,
    issueId: string
): Issue | undefined {
    for (let i = 0; i < project.columns.length; i++) {
        const issueInCol = project.columns[i].issues.find(
            (iss) => iss.issueId == issueId
        );
        if (issueInCol) return issueInCol;
    }
    return undefined;
}

/**
 * Pure function for updating a column to project (where the column is found with the id).
 */
export function updateProjectColumn(project: Project, column: Column) {
    const colIndex = project.columns.findIndex(
        (col) => col.columnId == column.columnId
    );
    if (colIndex < 0) {
        throw new EntityNotInParentError(
            `Couldn't find column with id ${column.columnId} to update in project.`
        );
    }

    // Copy proj to keep func pure
    const updatedProject = copyProject(project);

    // Delete old column
    updatedProject.columns.splice(colIndex, 1);

    // Insert new column
    updatedProject.columns.splice(colIndex, 0, column);

    return updatedProject;
}

/**
 * Pure function for relocating a column within the project.
 */
export function relocateProjectColumn(
    project: Project,
    column: Column,
    newIndex: number
) {
    if (newIndex < 0 || newIndex >= project.columns.length) {
        throw new IndexOutOfBoundsError(
            `Could not relocate column to ${newIndex} index.`
        );
    }

    // Find column
    const colIndex = project.columns.findIndex(
        (col) => col.columnId == column.columnId
    );
    if (colIndex < 0) {
        throw new EntityNotInParentError(
            `Couldn't find column with id ${column.columnId} to update in project.`
        );
    }

    // Copy proj to keep func pure
    const updatedProject = copyProject(project);

    // Remove column at the index
    updatedProject.columns.splice(colIndex, 1);

    // Insert the column at the new index
    updatedProject.columns.splice(newIndex, 0, column);

    return updatedProject;
}

/**
 * Pure function for deleting an issue in a project.
 */
export function deleteProjectColumn(project: Project, column: Column) {
    // Copy proj to keep func pure
    const updatedProject = copyProject(project);

    // Delete column in project
    const columnIndex = updatedProject.columns.findIndex(
        (col) => col.columnId === column.columnId
    );
    if (columnIndex < 0) {
        throw new EntityNotInParentError(
            `Column with id ${column.columnId} not found in project with id ${updatedProject.id}`
        );
    }
    updatedProject.columns.splice(columnIndex, 1);

    return updatedProject;
}

/**
 * Pure function for updating an issue in a project.
 */
export function updateProjectIssue(project: Project, issue: Issue) {
    // Copy proj to keep func pure
    const updatedProject = copyProject(project);

    let column = getColumnOfIssue(updatedProject, issue.issueId);
    if (!column) {
        throw new NotFoundError(
            `Couldn't find parent column for issue with id ${issue.issueId} in project with id ${project.id}`
        );
    }

    // Update issue in column
    const issueIndex = column.issues.findIndex(
        (iss) => iss.issueId == issue.issueId
    );
    if (issueIndex < 0)
        throw new EntityNotInParentError(
            `Fatal error; thought issue with id ${issue.issueId} was in column with id ${column.columnId}, but was not.`
        );
    column.issues[issueIndex] = issue;

    return updatedProject;
}

/**
 * Pure function for deleting an issue in a project.
 */
export function deleteProjectIssue(project: Project, issue: Issue) {
    // Copy proj to keep func pure
    const updatedProject = copyProject(project);

    let column = getColumnOfIssue(updatedProject, issue.issueId);
    if (!column) {
        throw new NotFoundError(
            `Couldn't find parent column for issue with id ${issue.issueId} in project with id ${project.id}`
        );
    }

    // Ddelete issue in column
    const issueIndex = column.issues.findIndex(
        (iss) => iss.issueId == issue.issueId
    );
    if (issueIndex < 0)
        throw new EntityNotInParentError(
            `Fatal error; thought issue with id ${issue.issueId} was in column with id ${column.columnId}, but was not.`
        );
    column.issues.splice(issueIndex, 1);

    return updatedProject;
}

export function copyProject(project: Project): Project {
    // Since projects may be database models, can't use spread operator
    const { id, name, description, createdAt, columns, users } = project;
    return {
        id,
        name,
        description,
        createdAt,
        columns: [...columns],
        users: [...users],
    };
}

function getColumnOfIssue(
    project: Project,
    issueId: string
): Column | undefined {
    for (let i = 0; i < project.columns.length; i++) {
        const issueInColumn = project.columns[i].issues.find(
            (iss) => iss.issueId == issueId
        );
        if (issueInColumn) {
            return project.columns[i];
        }
    }
    return undefined;
}
