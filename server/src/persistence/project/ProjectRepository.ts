import { ProjectModel, ProjectModelType } from "./projectModel";
import {
    GetProjectDto,
    PostProjectDto,
    UpdateProjectDto,
} from "../../application/contracts/project";

export async function createProject(
    dto: PostProjectDto
): Promise<GetProjectDto> {
    let model = mapDtoToModel(dto);

    await model.save();

    return mapModelToDto(model);
}

export async function readAllProjects(): Promise<GetProjectDto[]> {
    const projectModels: ProjectModelType[] = await ProjectModel.find({});
    return projectModels.map((model) => mapModelToDto(model));
}

export async function readProject(id: string): Promise<GetProjectDto> {
    let projectModel = await ProjectModel.findById(id);
    if (!projectModel) throw new Error("Not found");
    return mapModelToDto(projectModel);
}

export async function updateProject(
    id: string,
    dto: UpdateProjectDto
): Promise<GetProjectDto> {
    let projectModel = await ProjectModel.findById(id);
    if (!projectModel) throw new Error("Not found");

    const { name, description, columns } = dto;
    projectModel.name = name;
    projectModel.description = description;
    projectModel.columns = columns;
    await projectModel.save();

    return mapModelToDto(projectModel);
}

export async function deleteProject(id: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(id);
}

function mapDtoToModel(dto: PostProjectDto): ProjectModelType {
    const { name, description, createdAt } = dto;
    return new ProjectModel({
        name,
        description,
        columns: [],
        createdAt: createdAt,
    });
}

function mapModelToDto(model: ProjectModelType): GetProjectDto {
    const { id, name, description, columns, createdAt } = model;
    return {
        id,
        name,
        description,
        columns: Array.from([...columns]),
        createdAt,
    };
}
