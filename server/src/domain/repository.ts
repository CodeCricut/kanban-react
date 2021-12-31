import { Column } from "./column";
import { Issue } from "./issue";
import { Project } from "./project";

export interface IEntityRepository<TEntity> {
    create(entity: TEntity): Promise<TEntity>;
    read(id: string): Promise<TEntity>;
    update(id: string, entity: TEntity): Promise<TEntity>;
    delete(id: string): Promise<void>;
}

export interface IIssueRepository extends IEntityRepository<Issue> {}
export interface IColumnRepository extends IEntityRepository<Column> {}
export interface IProjectRepository extends IEntityRepository<Project> {}
