import {
    readColumn,
    updateColumn,
} from "../../persistence/column/ColumnRepository";
import { createIssue } from "../../persistence/issues/IssueRepository";
import { PostIssueDto } from "../contracts/issue";

type AddIssueToColumnCommand = {
    columnId: string;
    issueIndex: number;
    name: string;
    description?: string;
    createdAt: string;
};

export async function addIssueToColumn(command: AddIssueToColumnCommand) {
    const parentColumn = await readColumn(command.columnId);
    if (
        command.issueIndex > parentColumn.issues.length ||
        command.issueIndex < 0
    )
        throw new Error("Tried inserting issue at invalid index");

    const postDto: PostIssueDto = command;

    // Create the issue
    const created = await createIssue(postDto);

    // Add the issue to the column at the correct index
    parentColumn.issues.splice(command.issueIndex, 0, created.id);

    return await updateColumn(parentColumn.id, parentColumn);
}
