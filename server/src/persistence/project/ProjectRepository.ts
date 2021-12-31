import { Project } from "../../domain/project";
import { IProjectRepository } from "../../domain/repository";
import { mapDomainToModel, mapModelToDomain } from "./mappers";
import { ProjectModel } from "./projectModel";

export class ProjectRepository implements IProjectRepository {
    async create(entity: Project): Promise<Project> {
        // TODO: verify entity contains required and valid fields
        let createdProject = mapDomainToModel(entity);

        await createdProject.save();

        return mapModelToDomain(createdProject);
    }

    read(id: string): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: Project): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
