import React, { useEffect, useState } from "react";
import { IProjectsStorageService } from "../../application/contracts/projectsStorage";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../projectsApi/hook";

export const ProjectsContext = React.createContext<IProjectsStorageService>(
    {} as IProjectsStorageService
);

type ProviderProps = { children: React.ReactNode };
export const ProjectsProvider = ({ children }: ProviderProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    
    const value: IProjectsStorageService = {
        projects,
        updateProjects: setProjects,
    };
    
    useEffect(() => {
        // TODO: populate with user's projects if logged in 
    }, []);

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};
