import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Project } from "../../domain/project";
import { useNavigate, Link } from "react-router-dom";

type StylesType = {
    container: SxProps;
    header: SxProps;
    icon: SxProps;
    name: SxProps;
    content: SxProps;
};
const styles: StylesType = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: 75,
        height: 100,
        padding: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
    },
    icon: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        fontSize: 14,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        height: 18,
        width: 18,
        borderRadius: 1,
        marginRight: 1,
    },
    name: {
        fontSize: 18,
        color: "primary.dark",
        fontWeight: "bold",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
    content: {
        fontSize: 14,
        color: "text.main",
        fontWeight: "normal",
    },
};

export const ProjectCard = ({ project }: { project: Project }) => {
    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={styles.container}>
            <Box sx={styles.header}>
                <Typography sx={styles.icon}>
                    {project.name?.charAt(0).toUpperCase() ?? "P"}
                </Typography>
                <Typography
                    sx={styles.name}
                    variant="h3"
                    onClick={() => navigate(`/project/${project.id}`)}
                >
                    {project.name}
                </Typography>
            </Box>
            <Box>
                <Typography sx={styles.content}>
                    {project.description}
                </Typography>
            </Box>
        </Card>
    );
};
