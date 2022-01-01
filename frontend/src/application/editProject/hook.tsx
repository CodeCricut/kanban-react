import { useCallback } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { editProject } from "./editProject";

type EditProjectFunction = {
    (id: string, name: string, description: string): Promise<Project>;
};

export function useEditProject(): EditProjectFunction {
    const projectStorageService = useProjectsStorage();
    const projectsApiService = useProjectsApiService();

    const func = useCallback(
        (id: string, name: string, description: string) =>
            editProject(id, name, description, {
                projectStorageService,
                projectsApiService,
            }),
        []
    );

    return func;
}
