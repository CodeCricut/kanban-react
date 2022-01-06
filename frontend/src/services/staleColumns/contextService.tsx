import React, { useState } from "react";
import { IStaleColumnService } from "../../application/contracts/staleColumnService";

export const StaleColumnsContext = React.createContext<IStaleColumnService>(
    {} as IStaleColumnService
);

const addStaleColumn = (columnId: string, columnIds: string[]): string[] => [
    ...columnIds,
    columnId,
];

const removeStaleColumn = (columnId: string, columnIds: string[]): string[] => {
    // Find the column to remove
    const matchingIndex = columnIds.findIndex((projId) => projId === columnId);
    if (matchingIndex < 0) return [...columnIds];

    const updatedColumns = [...columnIds];
    updatedColumns.splice(matchingIndex, 1);
    return updatedColumns;
};

export const StaleColumnsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [staleColumnIds, setStaleColumnIds] = useState<string[]>([]);

    return (
        <StaleColumnsContext.Provider
            value={{
                addStaleColumn: (columnId: string) => {
                    const updated = addStaleColumn(columnId, staleColumnIds);
                    setStaleColumnIds(updated);
                },
                removeStaleColumn: (columnId: string) => {
                    const updated = removeStaleColumn(columnId, staleColumnIds);
                    setStaleColumnIds(updated);
                },
                staleColumnIds,
            }}
        >
            {children}
        </StaleColumnsContext.Provider>
    );
};
