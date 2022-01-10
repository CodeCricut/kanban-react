import { v4 as uuid } from "uuid";
import {
    GetPrivateUserDto,
    GetPublicUserDto,
} from "../application/contracts/user";
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

type CreateValidGetPrivateUserDtoFunction = {
    (pwdHash: string): GetPrivateUserDto;
};
export const createValidGetPrivateUserDto: CreateValidGetPrivateUserDtoFunction =
    (pwdHash: string) => ({
        id: uuid(),
        username: `USERNAME ${uuid()}`,
        email: `EMAIL${uuid()}@email.com`,
        passwordHash: pwdHash,
        createdAt: validCreatedAtString,
        ownedProjects: [],
        ownedColumns: [],
        ownedIssues: [],
    });
