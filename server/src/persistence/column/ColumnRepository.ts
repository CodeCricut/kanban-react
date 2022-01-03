import { Types } from "mongoose";
import {
    GetColumnDto,
    IColumnRepository,
    PostColumnDto,
    UpdateColumnDto,
} from "../../application/contracts/column";
import { ColumnModel, ColumnModelType } from "./columnModel";

export class ColumnRepository implements IColumnRepository {
    async create(dto: PostColumnDto): Promise<GetColumnDto> {
        const model = mapDtoToModel(dto);
        await model.save();
        return mapModelToDto(model);
    }

    async read(id: string): Promise<GetColumnDto> {
        const model = await ColumnModel.findById(id);
        if (!model) throw new Error("Couldn't find column with id " + id);
        return mapModelToDto(model);
    }

    async readArray(ids: string[]): Promise<GetColumnDto[]> {
        const idArr: Types.ObjectId[] = ids.map((id) => Types.ObjectId(id));
        const models = await ColumnModel.find({
            _id: {
                $in: idArr,
            },
        });
        if (models.length != ids.length)
            throw new Error("Couldn't retrieve one or more columns");
        return models.map((model) => mapModelToDto(model));
    }

    update(id: string, dto: UpdateColumnDto): Promise<GetColumnDto> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
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
