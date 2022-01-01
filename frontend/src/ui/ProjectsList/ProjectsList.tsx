import React from "react";
import { List, ListItem, Divider } from "@mui/material";
import { Project } from "../../domain/project";
import { ProjectItem } from "./ProjectItem";

type ProjectListProperties = {
    projects: Project[];
    handleSelect?: (project: Project) => void;
};
export const ProjectsList = ({
    projects,
    handleSelect,
}: ProjectListProperties) => {
    return (
        <List>
            {projects.map((project) => (
                <React.Fragment key={project.id}>
                    <ListItem
                        onClick={() =>
                            handleSelect ? handleSelect(project) : {}
                        }
                    >
                        <ProjectItem project={project} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};
