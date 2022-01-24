import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { deleteIssue } from "./deleteIssue";

type DeleteIssueFunction = {
    (issueId: string, projectId: string): Promise<Project>;
};

export function useDeleteIssue(): DeleteIssueFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        (issueId: string, projectId: string) =>
            deleteIssue(issueId, projectId, {
                projectsApiService,
                projectsStorageService,
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
