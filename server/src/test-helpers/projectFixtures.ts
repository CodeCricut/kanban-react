import { v4 as uuid } from "uuid";
import {
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
