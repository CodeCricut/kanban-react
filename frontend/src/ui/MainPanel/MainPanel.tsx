import React from "react";
import { useSelectedProjectService } from "../../services/selectedProject";
import { ProjectDashboard } from "../ProjectDashboard/ProjectDashboard";

export const MainPanel = () => {
    const { selectedProject } = useSelectedProjectService();

    return (
        <div>
            {selectedProject ? (
                <ProjectDashboard project={selectedProject} />
            ) : (
                <div>no project selected</div>
            )}
        </div>
    );
};
