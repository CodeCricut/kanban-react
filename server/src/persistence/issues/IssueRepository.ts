import {
    GetIssueDto,
    IIssueRepository,
    PostIssueDto,
} from "../../application/contracts/issue";
import { IssueModel, IssueModelType } from "./issueModel";

export class IssueRepository implements IIssueRepository {
    create = async (dto: PostIssueDto): Promise<GetIssueDto> => {
        const model = mapDtoToModel(dto);
        await model.save();
        return mapModelToDto(model);
    };

    read = async (id: string): Promise<GetIssueDto> => {
        const model = await IssueModel.findById(id);
        if (!model) throw new Error(`Couldn't find issue with id ${id}`);
        return mapModelToDto(model);
    };

    readArray = async (ids: string[]): Promise<GetIssueDto[]> => {
        const issues: GetIssueDto[] = [];
        for (let i = 0; i < ids.length; i++) {
            const issue = await this.read(ids[i]);
            issues.push(issue);
        }
        return issues;
    };
}

function mapDtoToModel(dto: PostIssueDto): IssueModelType {
    const { name, description, createdAt } = dto;
    return new IssueModel({
        name,
        description,
        createdAt,
    });
}

function mapModelToDto(model: IssueModelType): GetIssueDto {
    const { id, name, description, createdAt } = model;
    return {
        id,
        name,
        description,
        createdAt,
    };
}
