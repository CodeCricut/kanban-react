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
        getProjectColumns(projectId, {
            projectsApiService,
        }).then((columns) => {
            setProjectColumns(columns);
            // TODO: I think that when the columns are reloaded, the project should be set as not stale
        });
    }, [
        projectId,
        projectsApiService,
        projectsStorageService, // Requery the api for columns when the project storage is updated
        isProjectStale, // Reload if project is stale
    ]);

    return projectColumns;
}
