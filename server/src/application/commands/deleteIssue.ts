import {
    readColumn,
    updateColumn,
} from "../../persistence/project/ColumnRepository";
import { deleteIssue } from "../../persistence/project/IssueRepository";

type DeleteIssueCommand = {
    id: string;
    columnId: string;
};

export async function handleDeleteIssueCommand({
    id,
    columnId,
}: DeleteIssueCommand) {
    const parentColumn = await readColumn(columnId);

    const issueIndex = parentColumn.issues.findIndex(
        (issueId) => issueId == id
    );
    if (issueIndex < 0)
        throw new Error(
            "Tried removing issue from a column it did not belong to."
        );

    // Remove the issue from the column
    parentColumn.issues.splice(issueIndex, 1);
    await updateColumn(columnId, parentColumn);

    // Delete the issue
    await deleteIssue(id);
}
