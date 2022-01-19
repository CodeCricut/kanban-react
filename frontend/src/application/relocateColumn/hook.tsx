import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { relocateColumn } from "./relocateColumn";

type RelocateColumnFunction = {
    (columnId: string, projectId: string, newIndex: number): Promise<Project>;
};

export function useMoveColumn(): RelocateColumnFunction {
    const projectStorageService = useProjectsStorage();
    const projectsApiService = useProjectsApiService();

    const func = useCallback(
        (columnId: string, projectId: string, newIndex: number) =>
            relocateColumn(columnId, projectId, newIndex, {
                projectStorageService,
                projectsApiService,
            }),
        [projectStorageService, projectsApiService]
    );

    return func;
}
