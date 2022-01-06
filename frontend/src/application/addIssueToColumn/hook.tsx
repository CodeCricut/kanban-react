import { useCallback } from "react";
import { Column } from "../../domain/column";
import { useColumnsApiService } from "../../services/columnsApi/hook";
import { useDateTimeService } from "../../services/dateTime/hook";
import { useStaleColumnsService } from "../../services/staleColumns/hook";
import { addIssueToColumn } from "./addIssueToColumn";

type AddIssueToColumnFunction = {
    (column: Column, name: string, description: string): Promise<Column>;
};

export function useAddIssueToColumn(): AddIssueToColumnFunction {
    const columnsApiService = useColumnsApiService();
    const dateTimeService = useDateTimeService();
    const staleColumnsService = useStaleColumnsService();

    const func = useCallback(
        (column: Column, name: string, description: string) =>
            addIssueToColumn(column, name, description, {
                columnsApiService,
                dateTimeService,
                staleColumnsService,
            }),
        []
    );

    return func;
}
