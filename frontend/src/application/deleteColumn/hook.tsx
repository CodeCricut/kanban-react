import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { deleteColumn } from "./deleteColumn";

type DeleteColumnFunction = {
    (columnId: string, projectId: string): Promise<Project>;
};

export function useDeleteColumn(): DeleteColumnFunction {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const func = useCallback(
        (columnId: string, projectId: string) =>
            deleteColumn(columnId, projectId, {
                projectsApiService, projectsStorageService
            }),
        [projectsApiService, projectsStorageService]
    );

    return func;
}
