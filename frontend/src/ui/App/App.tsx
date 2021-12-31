import { Route } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { AppRouter } from "../shared/AppRouter";
import { RootProvider } from "../shared/RootProvider";

export const App = () => {
    return (
        <RootProvider>
            <AppRouter>
                <Route path="/" element={<Dashboard />} />
            </AppRouter>
        </RootProvider>
    );
};
