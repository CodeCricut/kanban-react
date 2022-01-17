import React from "react";
import { Outlet } from "react-router-dom";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";

export const Layout = () => {
    return (
        <div>
            <KanbanAppBar />
            <Outlet />
        </div>
    );
};
