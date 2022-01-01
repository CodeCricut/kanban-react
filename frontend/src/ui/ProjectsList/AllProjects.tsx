import React, { useState, useEffect } from "react";
import { useAllProjects } from "../../application/getAllProjects/hook";
import { Project } from "../../domain/project";
import { useSelectedProjectService } from "../../services/selectedProject";
import { ProjectsList } from "./ProjectsList";

export const AllProjects = () => {
    const allProjects = useAllProjects();

    const selectedProjectService = useSelectedProjectService();

    const handleSelect = (project: Project) => {
        selectedProjectService.setSelectedProject(project);
    };

    return <ProjectsList projects={allProjects} handleSelect={handleSelect} />;
};
