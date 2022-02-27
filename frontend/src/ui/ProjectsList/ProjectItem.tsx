import React from "react";
import {
    ListItemIcon,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
} from "@mui/material";
import { Project } from "../../domain/project";
import { SxProps } from "@mui/system";
type StylesType = {
    container: SxProps;
    projectInitial: SxProps;
};
const styles: StylesType = {
    container: {
        margin: 0,
        padding: 0,
    },
    projectInitial: {
        margin: 1,
        backgroundColor: "info.dark",
        borderRadius: "3px",
        textAlign: "center",
        minWidth: "25px",
        color: "info.contrastText",
        fontWeight: "bold",
        alignSelf: "start",
    },
};
type ProjectItemProps = {
    project: Project;
    handleSelect: () => void;
};
export const ProjectItem = ({ project, handleSelect }: ProjectItemProps) => {
    return (
        <ListItem disableGutters sx={styles.container}>
            <ListItemButton disableGutters onClick={handleSelect}>
                <Box sx={styles.projectInitial}>
                    {project.name?.charAt(0).toUpperCase() ?? "P"}
                </Box>
                <ListItemText
                    primary={project.name}
                    secondary={project.description}
                />
            </ListItemButton>
        </ListItem>
    );
};
