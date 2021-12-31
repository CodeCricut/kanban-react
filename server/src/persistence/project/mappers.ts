import { Project } from "../../domain/project";
import { ProjectModel } from "./projectModel";
import { Document } from "mongoose";

type ProjectModelType = Project & Document<any, any, Project>;

export function mapDomainToModel(project: Project): ProjectModelType {
    const { name, description, columns, createdAt } = project;
    return new ProjectModel({
        name,
        description,
        columns,
        createdAt,
    });
}

export function mapModelToDomain(model: ProjectModelType): Project {
    const { id, name, description, columns, createdAt } = model;
    return {
        id,
        name,
        description,
        columns,
        createdAt,
    };
}
