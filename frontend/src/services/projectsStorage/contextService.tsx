import React, { useEffect, useState } from "react";
import { IProjectsStorageService } from "../../application/contracts/projectsStorage";
import { Project } from "../../domain/project";
import { useProjectsApiService } from "../projectsApi/hook";

export const ProjectsContext = React.createContext<IProjectsStorageService>(
    {} as IProjectsStorageService
);

type ProviderProps = { children: React.ReactNode };
export const ProjectsProvider = ({ children }: ProviderProps) => {
    const { getAllProjects } = useProjectsApiService();
    const [projects, setProjects] = useState<Project[]>([]); // TODO: I think the projects should be loaded from the api at first

    const value: IProjectsStorageService = {
        projects,
        updateProjects: setProjects,
    };

    useEffect(() => {
        const loadInitialProjects = async () => {
            const loaded = await getAllProjects();
            console.log("LOADED INITIAL PROJECTS:");
            console.dir(loaded);
            return loaded;
        };
        loadInitialProjects().then((projs) => setProjects(projs));
    }, []);

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};
