import React, { useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { CreateNewProject } from "../CreateNewProject";
import { useModalService } from "../../services/modalService";
import { useIsLoggedIn } from "../../application/isLoggedIn/hook";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectedProjectService } from "../../services/selectedProject";
import { ProjectDashboard } from "../ProjectDashboard/ProjectDashboard";
import { WelcomeCard } from "../WelcomeCard/WelcomeCard";
import { useUsersProjects } from "../../application/getUsersProjects/hook";
import { useFindProjectInList } from "../../application/findProjectInList/hook";
import { Project } from "../../domain/project";
import { ProjectsList } from "../ProjectsList/ProjectsList";

type StylesType = {
    container: SxProps;
    projectList: SxProps;
    mainContent: SxProps;
};
const styles: StylesType = {
    container: {
        marginTop: 5,
        display: "grid",
        maxWidth: 1,
        gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(0, 1fr) minmax(0, 2fr)",
            md: "minmax(0, 1fr) minmax(0, 3fr)",
        },
    },
    projectList: {},
    mainContent: {
        maxWidth: 1,
        minWidth: 0,
    },
};

export const HomePage = () => {
    const navigate = useNavigate();
    const selectedProjectService = useSelectedProjectService();
    const usersProjects = useUsersProjects();

    const params = useParams();
    const { projectId } = params;
    const findProjectInList = useFindProjectInList(usersProjects);
    useEffect(() => {
        if (!projectId) {
            selectedProjectService.unselectProject();
            return;
        }
        const project = findProjectInList(projectId);
        if (project) {
            selectedProjectService.setSelectedProject(project);
        } else {
            selectedProjectService.unselectProject();
        }
    }, [projectId, findProjectInList, usersProjects]);

    const modalService = useModalService();

    const isLoggedIn = useIsLoggedIn();
    useEffect(() => {
        if (!isLoggedIn) {
            console.log("not logged in, redirecting to login...");
            navigate("/login");
        }
    }, [isLoggedIn]);

    const handleCreateNewProject = () => {
        modalService.setModal(<CreateNewProject />);
    };

    const handleSelectProject = (project: Project) => {
        navigate(`/project/${project.id}`)
    }

    if (!isLoggedIn) return <>Not logged in. Redirecting...</>;
    return (
        <Box sx={styles.container}>
            <Box sx={styles.projectList}>
             <ProjectsList projects={usersProjects} handleSelect={handleSelectProject} handleAdd={handleCreateNewProject}/>
            </Box>
            <Box sx={styles.mainContent}>
                {selectedProjectService.selectedProject ? (
                    <ProjectDashboard
                        project={selectedProjectService.selectedProject}
                    />
                ) : (
                    <WelcomeCard />
                )}
            </Box>
        </Box>
    );
};
