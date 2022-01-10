import { v4 as uuid } from "uuid";
import { GetPublicUserDto } from "../application/contracts/user";
import { validCreatedAtString } from "./dateFixtures";

type CreateValidGetPublicUserDtoFunction = {
    (): GetPublicUserDto;
};
export const createValidGetPublicUserDto: CreateValidGetPublicUserDtoFunction =
    () => ({
        id: uuid(),
        username: `USERNAME ${uuid()}`,
        createdAt: validCreatedAtString,
        ownedProjects: [],
        ownedColumns: [],
        ownedIssues: [],
    });
