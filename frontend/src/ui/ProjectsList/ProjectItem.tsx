import React from "react";
import { Typography, Box } from "@mui/material";
import { Project } from "../../domain/project";

export const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <Box>
            <Typography variant="subtitle1">{project.name}</Typography>
            <Typography variant="body2">{project.description}</Typography>
        </Box>
    );
};