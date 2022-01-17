import React from "react";
import { Box, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { CreateNewProject } from "../CreateNewProject";
import { useModalService } from "../../services/modalService";
import { MainPanel } from "../MainPanel/MainPanel";

type StylesType = {
    container: SxProps;
    projectList: SxProps;
    mainContent: SxProps;
};
const styles: StylesType = {
    container: {
        display: "grid",
        maxWidth: 1,
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 4fr)",
    },
    projectList: {
        gridColumn: "1",
    },
    mainContent: {
        gridColumn: "2",
        maxWidth: 1,
        minWidth: 0,
    },
};

export const Dashboard = () => {
    const modalService = useModalService();

    const handleCreateNewProject = (e: React.MouseEvent) => {
        e.preventDefault();
        modalService.setModal(<CreateNewProject />);
    };

    return (
        <Box sx={styles.container}>
            <Button onClick={handleCreateNewProject}>Create new project</Button>
            <Box sx={styles.projectList}>
            </Box>
            <Box sx={styles.mainContent}>
                <MainPanel />
            </Box>
        </Box>
    );
};
