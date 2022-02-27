import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useGetLoggedInUser } from "../../application/getLoggedInUser/hook";
import { useUsersProjects } from "../../application/getUsersProjects/hook";
import { PrivateUser } from "../../domain/privateUser";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { CreateProjectCard } from "../ProjectCard/CreateProjectCard";
import { CreateNewProject } from "../CreateNewProject";
import { useModalService } from "../../services/modalService/hook";

type StylesType = {
    container: SxProps;
    profile: SxProps & {
        profilePic: SxProps;
    };
    projects: SxProps;
    username: SxProps;
    email: SxProps;
    joined: SxProps;
};
const styles: StylesType = {
    container: {
        padding: 2,
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 3fr",
        },
    },
    profile: {
        display: "flex",
        flexDirection: "column",
        profilePic: {
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            height: 200,
            width: 200,
            fontSize: 128,
            fontWeight: "bold",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: "50%",
            marginY: 3,
        },
    },
    projects: {
        display: "grid",
        "& > *": {
            margin: {
                xs: "5px 0",
                sm: "5px 5px",
            },
        },
        gridTemplateColumns: {
            sm: "1fr",
            md: "1fr 1fr",
        },
    },
    username: {
        fontSize: 36,
        fontWeight: "bold",
    },
    email: {
        fontSize: 24,
        color: "grey.700",
        fontWeight: "light",
    },
    joined: {
        color: "grey.700",
    },
};
export const MePage = () => {
    const [user, setUser] = useState<PrivateUser | undefined>();

    const navigate = useNavigate();
    const getLoggedInUser = useGetLoggedInUser();

    const projects = useUsersProjects();

    useEffect(() => {
        getLoggedInUser().then((loaded) => {
            if (loaded) setUser(loaded);
            else navigate("/register");
        });
    }, [getLoggedInUser]);

    const { setModal } = useModalService();

    const handleCreateNewProject = () => {
        setModal(<CreateNewProject />);
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.profile}>
                <Box sx={styles.profile.profilePic}>
                    {user?.username?.charAt(0).toUpperCase() ?? "U"}
                </Box>

                <Typography variant="h3" sx={styles.username}>
                    {user?.username}
                </Typography>
                <Typography variant="subtitle2" sx={styles.email}>
                    {user?.email}
                </Typography>
                <Typography variant="subtitle2" sx={styles.joined}>
                    Joined{" "}
                    {moment(new Date(user?.createdAt ?? new Date())).format()}
                </Typography>
            </Box>
            <Box sx={styles.projects}>
                <CreateProjectCard handleAdd={handleCreateNewProject} />
                {projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </Box>
        </Box>
    );
};
