import { Route } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";
import { CssBaseline } from "@mui/material";

export const App = () => {
    return (
        <>
            <CssBaseline />
            <RootProvider>
                <AppRouter>
                    <Route path="/" element={<Dashboard />} />
                </AppRouter>
            </RootProvider>
        </>
    );
};
