import { Column } from "./column";
import { Issue } from "./issue";
import { Project } from "./project";

export interface EntityRepository<TEntity> {
    create(entity: TEntity): Promise<TEntity>;
    read(id: string): Promise<TEntity>;
    update(id: string, entity: TEntity): Promise<TEntity>;
    delete(id: string): Promise<void>;
}

export interface IssueRepository extends EntityRepository<Issue> {}
export interface ColumnRepository extends EntityRepository<Column> {}
export interface ProjectRepository extends EntityRepository<Project> {}
