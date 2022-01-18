import { useCallback } from "react";
import { Project } from "../../domain/project";

type FindProjectInListFunction = {
    (projectId: string|undefined): Project|undefined
}
export function useFindProjectInList(projects: Project[]): FindProjectInListFunction {
    const func = useCallback((projectId: string|undefined) => {
        if (!projectId) return undefined;
        return projects.find(proj => proj.id == projectId)
    }, [projects])
    return func;
}