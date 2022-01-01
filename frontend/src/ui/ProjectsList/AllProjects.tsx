import React, { useState, useEffect } from "react";
import { useAllProjects } from "../../application/getAllProjects/hook";
import { Project } from "../../domain/project";
import { ProjectsList } from "./ProjectsList";

export const AllProjects = () => {
    const allProjects = useAllProjects();

    return <ProjectsList projects={allProjects} />;
};
