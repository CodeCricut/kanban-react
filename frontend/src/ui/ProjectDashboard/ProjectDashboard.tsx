import React, { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import { useSelectedProjectService } from "../../services/selectedProject";
import { Project } from "../../domain/project";

const styles: SxProps = {
    display: "flex",
    flexDirection: "column",
};

export const ProjectDashboard = ({ project }: { project: Project }) => {
    return <Box sx={styles}>{project && project.name}</Box>;
};
