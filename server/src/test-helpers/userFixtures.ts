import { v4 as uuid } from "uuid";
import { GetPublicUserDto } from "../application/contracts/user";
import { User } from "../domain/user";
import { dateStringFixture } from "./dateFixtures";

type CreateValidGetPublicUserDtoFunction = {
    (): GetPublicUserDto;
};
export const createValidGetPublicUserDto: CreateValidGetPublicUserDtoFunction =
    () => ({
        id: uuid(),
        username: `USERNAME ${uuid()}`,
        createdAt: dateStringFixture,
        projects: [],
        ownedColumns: [],
        ownedIssues: [],
    });

type CreateUserFixtureFunction = {
    (pwdHash: string): User;
};
export const createUserFixture: CreateUserFixtureFunction = (
    pwdHash: string
) => ({
    id: uuid(),
    username: `USERNAME ${uuid()}`,
    email: `EMAIL${uuid()}@email.com`,
    passwordHash: pwdHash,
    createdAt: dateStringFixture,
    projects: [],
});
