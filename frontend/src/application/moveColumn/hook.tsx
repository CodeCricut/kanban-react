import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { moveColumn } from "./moveColumn";

type MoveColumnFunction = {
    (columnId: string, projectId: string, newIndex: number): Promise<Project>;
};

export function useMoveColumn(): MoveColumnFunction {
    const projectStorageService = useProjectsStorage();
    const projectsApiService = useProjectsApiService();

    const func = useCallback(
        (columnId: string, projectId: string, newIndex: number) =>
            moveColumn(columnId, projectId, newIndex, {
                projectStorageService,
                projectsApiService,
            }),
        []
    );

    return func;
}
