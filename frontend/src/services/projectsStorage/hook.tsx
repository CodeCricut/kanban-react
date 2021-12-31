import { useContext } from "react";
import { IProjectsStorageService } from "../../application/contracts/projectsStorage";
import { ProjectsContext } from "./contextService";

/**
 * Projects storage service adapter for using a React Context.
 */
export function useProjectsStorage(): IProjectsStorageService {
    return useContext(ProjectsContext);
}
