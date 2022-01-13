import { Column } from "./column";
import { EntityNotInParentError, IndexOutOfBoundsError } from "./errors";
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
