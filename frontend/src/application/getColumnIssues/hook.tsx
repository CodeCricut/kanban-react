import { useEffect, useState } from "react";
import { Issue } from "../../domain/issue";
import { useColumnsApiService } from "../../services/columnsApi/hook";
import {
    useIsColumnStale,
    useStaleColumnsService,
} from "../../services/staleColumns/hook";
import { getColumnIssues } from "./getColumnIssues";

export function useColumnIssues(columnId: string): Issue[] {
    const [columnIssues, setColumnIssues] = useState<Issue[]>([]);

    const columnsApiService = useColumnsApiService();
    const isColumnStale = useIsColumnStale(columnId);
    const staleColumnService = useStaleColumnsService();

    useEffect(() => {
        getColumnIssues(columnId, {
            columnsApiService,
        }).then((issues) => {
            setColumnIssues(issues);
            staleColumnService.removeStaleColumn(columnId); // TODO: I don't know if this is correct, since the column might still be stale
        });
    }, [columnId, isColumnStale]);

    return columnIssues;
}
