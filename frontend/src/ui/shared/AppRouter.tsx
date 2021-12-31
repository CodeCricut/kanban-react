import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRouter = ({ children }: { children: React.ReactNode }) => {
    return (
        <Router>
            <div>
                <Routes>{children}</Routes>
            </div>
        </Router>
    );
};
