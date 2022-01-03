import React, { useState } from "react";
import { IStaleProjectService as IStaleProjectsService } from "../../application/contracts/staleProjectService";

export const StaleProjectsContext = React.createContext<IStaleProjectsService>(
    {} as IStaleProjectsService
);

const addStaleProject = (projectId: string, projectIds: string[]): string[] => [
    ...projectIds,
    projectId,
];

const removeStaleProject = (
    projectId: string,
    projectIds: string[]
): string[] => {
    // Find the project to remove
    const matchingIndex = projectIds.findIndex(
        (projId) => projId === projectId
    );
    if (matchingIndex < 0) return [...projectIds];

    const updatedProjects = [...projectIds];
    updatedProjects.splice(matchingIndex, 1);
    return updatedProjects;
};

export const StaleProjectsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [staleProjectIds, setStaleProjectIds] = useState<string[]>([]);

    return (
        <StaleProjectsContext.Provider
            value={{
                addStaleProject: (projectId: string) => {
                    const updated = addStaleProject(projectId, staleProjectIds);
                    setStaleProjectIds(updated);
                },
                removeStaleProject: (projectId: string) => {
                    const updated = removeStaleProject(
                        projectId,
                        staleProjectIds
                    );
                    setStaleProjectIds(updated);
                },
                staleProjectIds,
            }}
        >
            {children}
        </StaleProjectsContext.Provider>
    );
};
