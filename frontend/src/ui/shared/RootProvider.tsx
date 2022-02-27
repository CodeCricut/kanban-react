import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { ProjectsProvider } from "../../services/projectsStorage";
import { ModalProvider } from "../../services/modalService";
import { SelectedProjectProvider } from "../../services/selectedProject";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./appTheme";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProjectsProvider>
            <SelectedProjectProvider>
                <DndProvider backend={HTML5Backend}>
                    <ThemeProvider theme={lightTheme}>
                        <ModalProvider>{children}</ModalProvider>
                    </ThemeProvider>
                </DndProvider>
            </SelectedProjectProvider>
        </ProjectsProvider>
    );
};
