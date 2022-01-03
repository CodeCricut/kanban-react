import { useCallback, useEffect, useState } from "react";
import { Column } from "../../domain/column";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { useIsProjectStale } from "../../services/staleProjects/hook";
import { getProjectColumns } from "./getProjectColumns";

export function useProjectColumns(projectId: string): Column[] {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();
    const isProjectStale = useIsProjectStale(projectId);

    const [projectColumns, setProjectColumns] = useState<Column[]>([]);

    useEffect(() => {
        console.log("project columns reloaded");
        getProjectColumns(projectId, {
            projectsApiService,
        }).then((columns) => setProjectColumns(columns));
    }, [
        projectId,
        projectsApiService,
        projectsStorageService, // Requery the api for columns when the project storage is updated
        isProjectStale, // Reload if project is stale
    ]);

    return projectColumns;
}
