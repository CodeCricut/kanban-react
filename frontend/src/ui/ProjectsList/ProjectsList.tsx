import React from "react";
import {
    List,
    ListItem,
    Divider,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Project } from "../../domain/project";
import { ProjectItem } from "./ProjectItem";
import { SxProps } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

type StylesType = {
    container: SxProps;
    header: SxProps & {
        heading: SxProps;
    };
    projects: SxProps;
};
const styles: StylesType = {
    container: {
        height: 1,
        margin: 2,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        heading: {
            fontSize: "1rem",
            color: "text.secondary",
            padding: 1,
        },
    },
    projects: {
        height: 0.75,
        overflowY: "scroll",
    },
};

type ProjectListProperties = {
    projects: Project[];
    handleSelect: (project: Project) => void;
    handleAdd: () => void;
};
export const ProjectsList = ({
    projects,
    handleSelect,
    handleAdd,
}: ProjectListProperties) => {
    return (
        <Box sx={styles.container}>
            <Box sx={styles.header}>
                <Typography variant="h4" sx={styles.header.heading}>
                    Projects
                </Typography>
                <IconButton onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
            </Box>
            <List sx={styles.projects}>
                <Divider />
                {console.dir(projects)}
                {projects.map((project) => (
                    <React.Fragment key={project.id}>
                        <ProjectItem
                            key={project.id}
                            project={project}
                            handleSelect={() => handleSelect(project)}
                        />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};
