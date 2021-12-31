import React from "react";
import { ProjectsProvider } from "../../services/projectsStorage";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return <ProjectsProvider>{children}</ProjectsProvider>;
};
