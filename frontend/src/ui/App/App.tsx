import { Route } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";
import { CssBaseline } from "@mui/material";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";
import { RegisterPage } from "../Register/Page";
import { MePage } from "../Me/Page";
import { LoginPage } from "../Login/Page";
import { Layout } from "../Layout/Layout";

export const App = () => {
    return (
        <>
            <CssBaseline />
            <RootProvider>
                <AppRouter>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="me" element={<MePage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                </AppRouter>
            </RootProvider>
        </>
    );
};
