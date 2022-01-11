import { readColumn } from "../../persistence/project/ColumnRepository";
import { readIssueArray } from "../../persistence/project/IssueRepository";

type GetColumnsIssuesQuery = {
    columnId: string;
};

export async function handleGetColumnsIssuesQuery({
    columnId,
}: GetColumnsIssuesQuery) {
    const column = await readColumn(columnId);
    return await readIssueArray(column.issues);
}
