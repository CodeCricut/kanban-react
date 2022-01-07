import { v4 as uuid } from "uuid";
import { GetColumnDto } from "../application/contracts/column";
import {
    GetProjectDto,
    PostProjectDto,
    UpdateProjectDto,
} from "../application/contracts/project";
import { validCreatedAtString } from "./dateFixtures";

type CreateValidPostProjectDtoFunction = {
    (): PostProjectDto;
};
export const createValidPostProjectDto: CreateValidPostProjectDtoFunction =
    () => ({
        name: "VALID NAME",
        description: "DESCRIPTION",
        createdAt: validCreatedAtString,
    });

type CreateValidUpdateProjectDtoFunction = {
    (columns?: string[]): UpdateProjectDto;
};
export const createValidUpdateProjectDto: CreateValidUpdateProjectDtoFunction =
    (columns?: string[]) => ({
        name: `UPDATED NAME (ID=${uuid()})`,
        description: `UPDATED DESCRIPTION (ID=${uuid()})`,
        columns: columns ?? [],
    });

type CreateValidGetProjectDtoFunction = {
    (columnIds: string[]): GetProjectDto;
};
export const createValidGetProjectDto: CreateValidGetProjectDtoFunction = (
    columnIds: string[] = []
) => ({
    columns: columnIds,
    createdAt: validCreatedAtString,
    id: uuid(),
    name: `NAME ${uuid()}`,
    description: `DESCRIPTION ${uuid()}`,
});
