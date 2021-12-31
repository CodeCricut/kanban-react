import React from "react";
import { Box, Button } from "@mui/material";
import { CreateNewProject } from "../CreateNewProject";

export const Dashboard = () => {
    const handleCreateNewProject = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("create new project");
    };

    return (
        <Box>
            <CreateNewProject />
            <Button onClick={handleCreateNewProject}>Create new project</Button>
        </Box>
    );
};
