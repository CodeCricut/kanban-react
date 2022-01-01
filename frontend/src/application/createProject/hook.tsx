import { useCallback } from "react";
import { useDateTimeService } from "../../services/dateTime/hook";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { createProject } from "./createProject";
import { useProjectsStorage } from "../../services/projectsStorage";
import { Project } from "../../domain/project";

type CreateProjectFunction = {
    (name: string, description: string): Promise<Project>;
};

export function useCreateProject(): CreateProjectFunction {
    const dateTimeService = useDateTimeService();
    const projectsApiService = useProjectsApiService();
    const projectStorageService = useProjectsStorage();

    const func = useCallback(
        (name: string, description: string) =>
            createProject(name, description, {
                dateTimeService,
                projectsApiService,
                projectStorageService,
            }),
        []
    );
    return func;
}
