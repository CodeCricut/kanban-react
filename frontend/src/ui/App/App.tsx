import { Route } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";
import { CssBaseline } from "@mui/material";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";

export const App = () => {
    return (
        <>
            <CssBaseline />
            <RootProvider>
                <KanbanAppBar/>
                <AppRouter>
                    <Route path="/" element={<Dashboard />} />
                </AppRouter>
            </RootProvider>
        </>
    );
};
