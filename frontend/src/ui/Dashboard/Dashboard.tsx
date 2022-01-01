import React from "react";
import { Box, Button } from "@mui/material";
import { CreateNewProject } from "../CreateNewProject";
import { useModalService } from "../../services/modalService";

export const Dashboard = () => {
    const modalService = useModalService();

    const handleCreateNewProject = (e: React.MouseEvent) => {
        e.preventDefault();
        modalService.setModal(<CreateNewProject />);
    };

    return (
        <Box>
            <Button onClick={handleCreateNewProject}>Create new project</Button>
        </Box>
    );
};
