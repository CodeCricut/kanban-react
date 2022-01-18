import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";

export const Layout = () => {
    return (
        <React.Fragment>
            <KanbanAppBar />
            <Container>
                {/* The outlet will display the contents of whatever component is selected as per the route/router */}
                <Outlet />
            </Container>
        </React.Fragment>
    );
};
