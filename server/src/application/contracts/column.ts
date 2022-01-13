import { Column } from "../../domain/column";
import { GetIssueDto, mapToGetIssueDto } from "./issue";

export type GetColumnDto = {
    id: string;
    name: string;
    description?: string;
    issues: GetIssueDto[];
    createdAt: string;
};

export type PostColumnDto = {
    name: string;
    description?: string;
    createdAt: string;
};

export function mapToGetColumnDto(column: Column): GetColumnDto {
    const { columnId: id, name, description, createdAt, issues } = column;
    return {
        id,
        name,
        description,
        createdAt,
        issues: issues.map((issue) => mapToGetIssueDto(issue)),
    };
}
