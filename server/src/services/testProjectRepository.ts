import { Project } from "../domain/project";
import { ProjectRepository } from "../domain/repository";

export class TestProjectRepository implements ProjectRepository {
    create(entity: Project): Promise<Project> {
        console.log("creating project...");
        console.dir(entity);
        return Promise.resolve({ ...entity, id: "kljadskl;fjas" });
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
