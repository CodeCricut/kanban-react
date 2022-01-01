import { useCallback, useEffect, useState } from "react";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { getAllProjects } from "./getAllProjects";

export function useAllProjects(): Project[] {
    const projectsApiService = useProjectsApiService();
    const projectsStorageService = useProjectsStorage();

    const [allProjects, setAllProjects] = useState<Project[]>([]);

    // Reload projects if any service changes (like when a project is added to the project storage)
    useEffect(() => {
        getAllProjects({ projectsApiService }).then((loaded) =>
            setAllProjects(loaded)
        );
    }, [projectsApiService, projectsStorageService]);

    return allProjects;
}
