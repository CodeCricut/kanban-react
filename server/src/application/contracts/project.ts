import { Project } from "../../domain/project";
import { GetColumnDto, mapToGetColumnDto } from "./column";

export type GetProjectDto = {
    id: string;
    users: string[];
    name: string;
    description?: string;
    columns: GetColumnDto[];
    createdAt: string;
};

export type PostProjectDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export function mapToGetProjectDto(project: Project): GetProjectDto {
    const { id, users, name, description, columns, createdAt } = project;
    return {
        id,
        users,
        name,
        description,
        columns: columns.map((col) => mapToGetColumnDto(col)),
        createdAt,
    };
}
