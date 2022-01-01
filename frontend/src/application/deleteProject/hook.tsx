import { useCallback } from "react";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { deleteProject } from "./deleteProject";

type DeleteProjectFunction = {
    (id: string): Promise<void>;
};

export function useDeleteProject(): DeleteProjectFunction {
    const projectStorageService = useProjectsStorage();
    const projectsApiService = useProjectsApiService();

    const func = useCallback(
        (id: string) =>
            deleteProject(id, {
                projectStorageService,
                projectsApiService,
            }),
        []
    );

    return func;
}
