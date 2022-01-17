import { Route } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";
import { CssBaseline } from "@mui/material";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";
import { RegisterPage } from "../Register/Page";
import { MePage } from "../Me/Page";

export const App = () => {
    return (
        <>
            <CssBaseline />
            <RootProvider>
                <KanbanAppBar/>
                <AppRouter>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/me" element={<MePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </AppRouter>
            </RootProvider>
        </>
    );
};
