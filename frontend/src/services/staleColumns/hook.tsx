import { useContext, useMemo } from "react";
import { StaleColumnsContext } from "./contextService";

export function useStaleColumnsService() {
    return useContext(StaleColumnsContext);
}

export function useIsColumnStale(columnId: string): boolean {
    const staleColumnsService = useStaleColumnsService();

    const isStale: boolean = useMemo(
        () => staleColumnsService.staleColumnIds.includes(columnId),
        [columnId, staleColumnsService]
    );

    return isStale;
}
