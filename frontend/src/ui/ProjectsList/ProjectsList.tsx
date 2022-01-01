import React from "react";
import { List, ListItem, Divider } from "@mui/material";
import { Project } from "../../domain/project";
import { ProjectItem } from "./ProjectItem";

export const ProjectsList = ({ projects }: { projects: Project[] }) => {
    return (
        <List>
            {projects.map((project) => (
                <React.Fragment key={project.id}>
                    <ListItem>
                        <ProjectItem project={project} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};
