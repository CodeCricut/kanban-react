import { useCallback } from "react";
import { Issue } from "../../domain/issue";
import { useIssuesApiService } from "../../services/issuesApi/hook";
import { useStaleColumnsService } from "../../services/staleColumns/hook";
import { editIssue } from "./editIssue";

type EditIssueFunction = {
    (
        id: string,
        name: string,
        description: string,
        columnId: string
    ): Promise<Issue>;
};

export function useEditIssue(): EditIssueFunction {
    const issuesApiService = useIssuesApiService();
    const staleColumnsService = useStaleColumnsService();

    const func = useCallback(
        (id: string, name: string, description: string, columnId: string) =>
            editIssue(id, name, description, columnId, {
                issuesApiService,
                staleColumnsService,
            }),
        []
    );

    return func;
}
