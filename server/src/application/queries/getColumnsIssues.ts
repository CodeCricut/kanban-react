import { readColumn } from "../../persistence/column/ColumnRepository";
import { readIssueArray } from "../../persistence/issues/IssueRepository";

type GetColumnsIssuesQuery = {
    columnId: string;
};

export async function getColumnsIssues({ columnId }: GetColumnsIssuesQuery) {
    const column = await readColumn(columnId);
    return await readIssueArray(column.issues);
}
