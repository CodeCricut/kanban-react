import { useCallback } from "react";
import { useIssuesApiService } from "../../services/issuesApi/hook";
import { useStaleColumnsService } from "../../services/staleColumns/hook";
import { deleteIssue } from "./deleteIssue";

type DeleteIssueFunction = {
    (issueId: string, columnId: string): Promise<void>;
};

export function useDeleteIssue(): DeleteIssueFunction {
    const issuesApiService = useIssuesApiService();
    const staleColumnsService = useStaleColumnsService();

    const func = useCallback(
        (issueId: string, columnId: string) =>
            deleteIssue(issueId, columnId, {
                issuesApiService,
                staleColumnsService,
            }),
        []
    );

    return func;
}
