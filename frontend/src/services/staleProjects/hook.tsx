import { useContext, useMemo } from "react";
import { StaleProjectsContext } from "./contextService";

export function useStaleProjectService() {
    return useContext(StaleProjectsContext);
}

export function useIsProjectStale(projectId: string): boolean {
    const staleProjectService = useStaleProjectService();

    const isStale: boolean = useMemo(() => {
        return staleProjectService.staleProjectIds.includes(projectId);
    }, [projectId, staleProjectService]);

    return isStale;
}
