import { NotFoundError } from "../../application/errors";
import { Column } from "../../domain/column";
import { Project } from "../../domain/project";
import { ProjectModel, ProjectModelType } from "../models/project";

type CreateProjectProps = {
    name: string;
    description?: string;
    createdAt: string;
    users: string[];
};
export async function createProject(
    props: CreateProjectProps
): Promise<Project> {
    const model = new ProjectModel({
        ...props,
        columns: [],
    });

    return await model.save();
}

export async function getProjectById(id: string): Promise<Project | null> {
    return await ProjectModel.findById(id);
}

export async function getProjectsByIds(
    ids: string[]
): Promise<(Project | null)[]> {
    const projects: (Project | null)[] = [];
    // TODO: optimize by querying in parallel
    for (let i = 0; i < ids.length; i++) {
        const proj = await getProjectById(ids[i]);
        projects.push(proj);
    }
    return projects;
}

type UpdateProjectProps = {
    name: string;
    description?: string;
    columns: Column[];
};
export async function updateProject(
    id: string,
    props: UpdateProjectProps
): Promise<Project> {
    let projectModel = await ProjectModel.findById(id);
    if (!projectModel) throw new NotFoundError();

    projectModel.name = props.name;
    projectModel.description = props.description;
    projectModel.columns = props.columns;
    return await projectModel.save();
}

export async function deleteProject(id: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(id);
}
