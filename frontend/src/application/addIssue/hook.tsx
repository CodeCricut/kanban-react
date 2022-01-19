import { useCallback } from "react";
import { Column } from "../../domain/column";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { addIssue } from "./addIssue";

type AddIssueFunction = {
    (
        project: Project,
        column: Column,
        issue: {
            name: string;
            description?: string;
        }
    ): Promise<Project>;
};
export function useAddIssue(): AddIssueFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        (
            project: Project,
            column: Column,
            issue: {
                name: string;
                description?: string;
            }
        ) =>
            addIssue(project, column, issue, {
                projectsApiService,
                projectsStorageService,
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
