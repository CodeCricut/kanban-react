import {
    GetIssueDto,
    PostIssueDto,
    UpdateIssueDto,
} from "../../application/contracts/issue";
import { IssueModel, IssueModelType } from "./issueModel";

export async function createIssue(dto: PostIssueDto): Promise<GetIssueDto> {
    const model = mapDtoToModel(dto);
    await model.save();
    return mapModelToDto(model);
}

export async function readIssue(id: string): Promise<GetIssueDto> {
    const model = await IssueModel.findById(id);
    if (!model) throw new Error(`Couldn't find issue with id ${id}`);
    return mapModelToDto(model);
}

export async function readIssueArray(ids: string[]): Promise<GetIssueDto[]> {
    const issues: GetIssueDto[] = [];
    for (let i = 0; i < ids.length; i++) {
        const issue = await readIssue(ids[i]);
        issues.push(issue);
    }
    return issues;
}

export async function updateIssue(
    id: string,
    dto: UpdateIssueDto
): Promise<GetIssueDto> {
    let issueModel = await IssueModel.findById(id);
    if (!issueModel) throw new Error("Not found");

    const { name, description } = dto;
    issueModel.name = name;
    issueModel.description = description;
    await issueModel.save();

    return mapModelToDto(issueModel);
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
