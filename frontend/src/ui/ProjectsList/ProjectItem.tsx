import React from "react";
import { Typography, Box } from "@mui/material";
import { Project } from "../../domain/project";

export const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <Box>
            <Typography variant="h5">{project.name}</Typography>
            <Typography variant="h6">{project.description}</Typography>
        </Box>
    );
};
