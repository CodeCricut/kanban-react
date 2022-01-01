import React from "react";
import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
import { SelectedProjectProvider } from "../../services/selectedProject";
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <SelectedProjectProvider>
                <ModalProvider>{children}</ModalProvider>
            </SelectedProjectProvider>
        </ProjectsProvider>
    );
};
