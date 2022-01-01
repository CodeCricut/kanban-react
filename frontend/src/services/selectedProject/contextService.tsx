import React, { useState } from "react";
import { ISelectedProjectService } from "../../application/contracts/selectedProjectService";
import { Project } from "../../domain/project";

export const SelectedProjectContext =
    React.createContext<ISelectedProjectService>({} as ISelectedProjectService);

export const SelectedProjectProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    return (
        <SelectedProjectContext.Provider
            value={{
                selectedProject,
                setSelectedProject,
                unselectProject: () => setSelectedProject(null),
            }}
        >
            {children}
        </SelectedProjectContext.Provider>
    );
};
