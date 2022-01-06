import {
    GetColumnDto,
    PostColumnDto,
    UpdateColumnDto,
} from "../../application/contracts/column";
import { ColumnModel, ColumnModelType } from "./columnModel";

export async function createColumn(dto: PostColumnDto): Promise<GetColumnDto> {
    const model = mapDtoToModel(dto);
    await model.save();
    return mapModelToDto(model);
}

export async function readColumn(id: string): Promise<GetColumnDto> {
    const model = await ColumnModel.findById(id);
    if (!model) throw new Error("Couldn't find column with id " + id);
    return mapModelToDto(model);
}

export async function readColumnArray(ids: string[]): Promise<GetColumnDto[]> {
    const columns: GetColumnDto[] = [];
    for (let i = 0; i < ids.length; i++) {
        const column = await readColumn(ids[i]);
        columns.push(column);
    }
    return columns;
}

export async function updateColumn(
    id: string,
    dto: UpdateColumnDto
): Promise<GetColumnDto> {
    let columnModel = await ColumnModel.findById(id);
    if (!columnModel) throw new Error("Not found");

    const { name, description, issues } = dto;
    columnModel.name = name;
    columnModel.description = description ?? "";
    columnModel.issues = issues;
    await columnModel.save();

    return mapModelToDto(columnModel);
}

export async function deleteColumn(id: string): Promise<void> {
    await ColumnModel.findByIdAndDelete(id);
}

function mapDtoToModel(dto: PostColumnDto): ColumnModelType {
    const { name, description, createdAt } = dto;
    return new ColumnModel({
        name,
        description,
        createdAt,
        issues: [],
    });
}

function mapModelToDto(model: ColumnModelType): GetColumnDto {
    const { id, name, description, createdAt } = model;
    const issues: string[] = Array.from([...model.issues]);
    return {
        id,
        name,
        description,
        createdAt,
        issues,
    };
}
