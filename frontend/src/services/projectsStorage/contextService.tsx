import React, { useState } from "react";
import { IProjectsStorageService } from "../../application/contracts/projectsStorage";
import { Project } from "../../domain/project";

export const ProjectsContext = React.createContext<IProjectsStorageService>(
    {} as IProjectsStorageService
);

type ProviderProps = { children: React.ReactNode };
export const ProjectsProvider = ({ children }: ProviderProps) => {
    const [projects, setProjects] = useState<Project[]>([]); // TODO: I think the projects should be loaded from the api at first

    const value: IProjectsStorageService = {
        projects,
        updateProjects: setProjects,
    };

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};
