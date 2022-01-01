import React from "react";
import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <ModalProvider>{children}</ModalProvider>
        </ProjectsProvider>
    );
};
