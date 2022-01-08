import { useCallback } from "react";
import { Column } from "../../domain/column";
import { useIssuesApiService } from "../../services/issuesApi/hook";
import { useStaleColumnsService } from "../../services/staleColumns/hook";
import { relocateIssue } from "./relocateIssue";

type RelocateIssueFunction = {
    (
        issueId: string,
        oldColumnId: string,
        newColumnId: string,
        newIndex: number
    ): Promise<Column>;
};

export function useRelocateIssue(): RelocateIssueFunction {
    const issuesApiService = useIssuesApiService();
    const staleColumnService = useStaleColumnsService();

    const func = useCallback(
        (
            issueId: string,
            oldColumnId: string,
            newColumnId: string,
            newIndex: number
        ) =>
            relocateIssue(issueId, oldColumnId, newColumnId, newIndex, {
                issuesApiService,
                staleColumnService,
            }),
        []
    );

    return func;
}
