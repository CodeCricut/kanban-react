import { useCallback } from "react";
import { Column } from "../../domain/column";
import { Project } from "../../domain/project";
import { useColumnsApiService } from "../../services/columnsApi/hook";
import { useStaleProjectService } from "../../services/staleProjects/hook";
import { editColumn } from "./editColumn";

type EditColumnFunction = {
    (
        id: string,
        name: string,
        description: string,
        projectId: string
    ): Promise<Column>;
};

export function useEditColumn(): EditColumnFunction {
    const columnsApiService = useColumnsApiService();
    const staleProjectService = useStaleProjectService();

    const func = useCallback(
        (id: string, name: string, description: string, projectId: string) =>
            editColumn(id, name, description, projectId, {
                columnsApiService,
                staleProjectService,
            }),
        []
    );

    return func;
}