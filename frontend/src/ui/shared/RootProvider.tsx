import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
import { SelectedProjectProvider } from "../../services/selectedProject";
import { StaleProjectsProvider } from "../../services/staleProjects/contextService";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <SelectedProjectProvider>
                <StaleProjectsProvider>
                    <DndProvider backend={HTML5Backend}>
                        <ModalProvider>{children}</ModalProvider>
                    </DndProvider>
                </StaleProjectsProvider>
            </SelectedProjectProvider>
        </ProjectsProvider>
    );
};
