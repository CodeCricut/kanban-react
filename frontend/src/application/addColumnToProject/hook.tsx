import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useDateTimeService } from "../../services/dateTime/hook";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { addColumnToProject } from "./addColumnToProject";

type AddColumnToProjectFunction = {
    (project: Project, name: string, description: string): Promise<Project>;
};

export function useAddColumnToProject(): AddColumnToProjectFunction {
    const dateTimeService = useDateTimeService();
    const projectsApiService = useProjectsApiService();
    const projectStorageService = useProjectsStorage();

    const func = useCallback(
        (project: Project, name: string, description: string) =>
            addColumnToProject(project, name, description, {
                dateTimeService,
                projectStorageService,
                projectsApiService,
            }),
        []
    );

    return func;
}
