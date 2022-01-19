import { useCallback } from "react";
import { Issue } from "../../domain/issue";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { editIssue } from "./editIssue";

type EditIssueFunction = {
    (
         issueId: string,
    projectId: string,
    issue: {
        name: string;
        description?: string;
    }
    ): Promise<Issue>;
};

export function useEditIssue(): EditIssueFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        ( issueId: string,
    projectId: string,
    issue: {
        name: string;
        description?: string;
    },) =>
            editIssue(issueId, projectId, issue, {
                projectsApiService,
                projectsStorageService
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
