import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { editColumn } from "./editColumn";

type EditColumnFunction = {
    (
        columnId: string,
        projectId: string,
        column: {
            name: string;
            description?: string;
        }
    ): Promise<Project>;
};

export function useEditColumn(): EditColumnFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        (
            columnId: string,
            projectId: string,
            column: {
                name: string;
                description?: string;
            }
        ) =>
            editColumn(columnId, projectId, column, {
                projectsApiService,
                projectsStorageService,
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
