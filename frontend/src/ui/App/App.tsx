import { Route } from "react-router-dom";
import { HomePage } from "../HomePage/HomePage";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";
import { CssBaseline } from "@mui/material";
import { KanbanAppBar } from "../AppBar/KanbanAppBar";
import { RegisterPage } from "../Register/Page";
import { MePage } from "../Me/Page";
import { LoginPage } from "../Login/Page";
import { Layout } from "../Layout/Layout";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export const App = () => {
    return (
        <>
            <CssBaseline />
            <RootProvider>
                <AppRouter>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<HomePage />} />
                        <Route path="project/:projectId" element={<HomePage />}/>
                        <Route path="me" element={<MePage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </AppRouter>
            </RootProvider>
        </>
    );
};
