import React from "react";
import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
import { SelectedProjectProvider } from "../../services/selectedProject";
import { StaleProjectsProvider } from "../../services/staleProjects/contextService";
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <SelectedProjectProvider>
                <StaleProjectsProvider>
                    <ModalProvider>{children}</ModalProvider>
                </StaleProjectsProvider>
            </SelectedProjectProvider>
        </ProjectsProvider>
    );
};
