import { useCallback } from "react";
import { useColumnsApiService } from "../../services/columnsApi/hook";
import { useStaleProjectService } from "../../services/staleProjects/hook";
import { deleteColumn } from "./deleteColumn";

type DeleteColumnFunction = {
    (columnId: string, projectId: string): Promise<void>;
};

export function useDeleteColumn(): DeleteColumnFunction {
    const columnApiService = useColumnsApiService();
    const staleProjectService = useStaleProjectService();

    const func = useCallback(
        (columnId: string, projectId: string) =>
            deleteColumn(columnId, projectId, {
                columnApiService,
                staleProjectService,
            }),
        []
    );

    return func;
}
