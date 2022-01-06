import { Column } from "../../domain/column";
import { createIssueObject } from "../../domain/issue";
import { convertDateToString } from "../../library/dates";
import { IColumnsApiService } from "../contracts/columnsApiService";
import { IDateTimeService } from "../contracts/dateTimeService";
import { IStaleColumnService } from "../contracts/staleColumnService";

type Dependencies = {
    dateTimeService: IDateTimeService;
    columnsApiService: IColumnsApiService;
    staleColumnsService: IStaleColumnService;
};

export async function addIssueToColumn(
    column: Column,
    name: string,
    description: string,
    dependencies: Dependencies
): Promise<Column> {
    const { dateTimeService, columnsApiService, staleColumnsService } =
        dependencies;

    // Add issue to last index
    const issueIndex = column.issues?.length ?? 0;

    // Create issue object
    const currTime = dateTimeService.getCurrentDateTime();
    const currTimeStr = convertDateToString(currTime);
    const issue = createIssueObject(name, description, currTimeStr);

    // Update column with api
    const updatedColumn = await columnsApiService.addIssue(
        column.id ?? "",
        issueIndex,
        issue
    );

    // Mark the col as stale so it is reloaded
    staleColumnsService.addStaleColumn(updatedColumn.id ?? "");

    return updatedColumn;
}
