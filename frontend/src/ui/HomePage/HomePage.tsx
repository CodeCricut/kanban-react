import React, { useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { CreateNewProject } from "../CreateNewProject";
import { useModalService } from "../../services/modalService";
import { UsersProjectList } from "../ProjectsList/UsersProjectList";
import { useIsLoggedIn } from "../../application/isLoggedIn/hook";
import { useNavigate } from "react-router-dom";
import { useSelectedProjectService } from "../../services/selectedProject";
import { ProjectDashboard } from "../ProjectDashboard/ProjectDashboard";
import { WelcomeCard } from "../WelcomeCard/WelcomeCard";

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

export const HomePage = () => {
    const modalService = useModalService();

    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            console.log("not logged in, redirecting to login...");
            navigate("/login");
        }
    }, [isLoggedIn]);

    const { selectedProject } = useSelectedProjectService();

    const handleCreateNewProject = (e: React.MouseEvent) => {
        e.preventDefault();
        modalService.setModal(<CreateNewProject />);
    };

    return isLoggedIn ? (
        <Box sx={styles.container}>
            <Button onClick={handleCreateNewProject}>Create new project</Button>
            <Box sx={styles.projectList}>
                <UsersProjectList />
            </Box>
            <Box sx={styles.mainContent}>
                {selectedProject ? (
                    <ProjectDashboard project={selectedProject} />
                ) : (
                    <WelcomeCard />
                )}
            </Box>
        </Box>
    ) : (
        <>Not logged in. Redirecting...</>
    );
};
