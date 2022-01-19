import { useCallback } from "react";
import { useDateTimeService } from "../../services/dateTime/hook";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { createProject } from "./createProject";
import { useProjectsStorage } from "../../services/projectsStorage";
import { Project } from "../../domain/project";

type CreateProjectFunction = {
    (project: {name: string, description: string}): Promise<Project>;
};

export function useCreateProject(): CreateProjectFunction {
    const projectsApiService = useProjectsApiService();
    const projectStorageService = useProjectsStorage();

    const func = useCallback(
        (project: {name: string, description: string}) =>
            createProject(project, {
                projectsApiService,
                projectStorageService,
            }),
        [projectsApiService, projectStorageService]
    );
    return func;
}
