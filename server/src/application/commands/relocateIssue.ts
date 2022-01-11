import {
    readColumn,
    updateColumn,
} from "../../persistence/project/ColumnRepository";
import { readIssue } from "../../persistence/project/IssueRepository";

type RelocateIssueCommand = {
    issueId: string;
    oldColumnId: string;
    newColumnId: string;
    newIndex: number;
};

export async function handleRelocateIssueCommand(
    command: RelocateIssueCommand
) {
    const { issueId, oldColumnId, newColumnId, newIndex } = command;

    const issue = await readIssue(issueId);
    if (!issue) throw new Error("Tried relocating issue which didn't exist.");

    let newColumn = await readColumn(newColumnId);
    if (newIndex < 0 || newIndex > newColumn.issues.length)
        throw new Error(
            "Tried relocating issue to invalid index on new column."
        );

    const oldColumn = await readColumn(oldColumnId);
    const indexInOldColumn = oldColumn.issues.findIndex(
        (oldId) => oldId == issueId
    );
    if (indexInOldColumn < 0)
        throw new Error("Couldn't find issue in old column.");

    // Remove issue from old column
    oldColumn.issues.splice(indexInOldColumn, 1);
    await updateColumn(oldColumn.id, oldColumn);

    // Refresh new column in case they were the same (since it now has one less issues)
    if (oldColumnId == newColumnId) newColumn = await readColumn(newColumnId);

    // Insert issue to new column at index
    newColumn.issues.splice(newIndex, 0, issueId);
    const updatedNewColumn = await updateColumn(newColumn.id, newColumn);

    // Return column containing issued
    return updatedNewColumn;
}
