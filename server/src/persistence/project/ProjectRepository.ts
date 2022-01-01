import { ProjectModel, ProjectModelType } from "./projectModel";
import { CreateProjectCommand } from "../../application/commands/createProject";
import {
    GetProjectDto,
    IProjectRepository,
    PostProjectDto,
} from "../../application/contracts/project";
import { Document } from "mongoose";
import { Project } from "../../domain/project";

export class ProjectRepository implements IProjectRepository {
    async create(dto: PostProjectDto): Promise<GetProjectDto> {
        let model = mapDtoToModel(dto);

        await model.save();

        return mapModelToDto(model);
    }

    read(id: string): Promise<Project> {
        throw new Error("Method not implemented.");
    }

    async readAll(): Promise<GetProjectDto[]> {
        const projectModels: ProjectModelType[] = await ProjectModel.find({});
        return projectModels.map((model) => mapModelToDto(model));
    }

    update(id: string, entity: Project): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
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
