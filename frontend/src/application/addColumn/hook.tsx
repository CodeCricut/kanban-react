import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useDateTimeService } from "../../services/dateTime/hook";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { addColumn } from "./addColumn";

type AddColumnFunction = {
    (project: Project, column: {name: string, description?: string}): Promise<Project>;
};

export function useAddColumn(): AddColumnFunction {
    const projectsApiService = useProjectsApiService();
    const projectStorageService = useProjectsStorage();

    const func = useCallback(
        (project: Project, column: {name: string, description?: string}) =>
            addColumn(project,column, {
                projectStorageService,
                projectsApiService,
            }),
        [projectsApiService, projectStorageService]
    );

    return func;
}
