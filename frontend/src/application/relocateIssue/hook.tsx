import { useCallback } from "react";
import { Column } from "../../domain/column";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { relocateIssue } from "./relocateIssue";

type RelocateIssueFunction = {
    (
        issueId: string,
        projectId: string,
        newColumnId: string,
        newIndex: number
    ): Promise<Project>;
};

export function useRelocateIssue(): RelocateIssueFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        (
            issueId: string,
            projectId: string,
            newColumnId: string,
            newIndex: number
        ) =>
            relocateIssue(issueId, projectId, newColumnId, newIndex, {
                projectsApiService,
                projectsStorageService,
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
