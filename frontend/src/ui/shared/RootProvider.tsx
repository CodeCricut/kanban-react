import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
import { SelectedProjectProvider } from "../../services/selectedProject";
import { StaleProjectsProvider } from "../../services/staleProjects/contextService";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <SelectedProjectProvider>
                <StaleProjectsProvider>
                    <DndProvider backend={HTML5Backend}>
                        <ThemeProvider theme={theme}>
                            <ModalProvider>{children}</ModalProvider>
                        </ThemeProvider>
                    </DndProvider>
                </StaleProjectsProvider>
            </SelectedProjectProvider>
        </ProjectsProvider>
    );
};
