import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { deleteIssue } from "./deleteIssue";

type DeleteIssueFunction = {
    (issueId: string, columnId: string): Promise<Project>;
};

export function useDeleteIssue(): DeleteIssueFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage()

    const func = useCallback(
        (issueId: string, columnId: string) =>
            deleteIssue(issueId, columnId, {
                projectsApiService,
                projectsStorageService
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
