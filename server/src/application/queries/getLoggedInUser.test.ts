import * as projectRepository from "../../persistence/repository/ProjectRepository";
import * as userRepository from "../../persistence/repository/UserRepository";

import { createUserFixture } from "../../test-helpers/userFixtures";
import { createProjectFixture } from "../../test-helpers/projectFixtures";
import { User } from "../../domain/user";
import { InvalidBackingStateError, NotAuthenticatedError } from "../errors";
import { Project } from "../../domain/project";
import { handleGetUserProjects } from "./getUsersProjects";
import { handleGetLoggedInUserQuery } from "./getLoggedInUser";
import { GetPrivateUserDto, mapToPrivateUserDto } from "../contracts/user";

// =================== Test setup ===================
let userFixture: User;
const getUserByIdSpy = jest.spyOn(userRepository, "getUserById");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    getUserByIdSpy.mockResolvedValue(userFixture);
});

// =================== Test cases ===================
test("should return user dto with id", async () => {
    const expected = mapToPrivateUserDto(userFixture);

    // Act
    const actual = await handleGetLoggedInUserQuery({ id: userFixture.id });

    // Expect user dto returned
    expectPrivateUserDtosEqual(actual, expected);
});

test("should throw if user not found", async () => {
    // User not found
    getUserByIdSpy.mockResolvedValue(null);

    // Act
    await expect(async () => {
        await handleGetLoggedInUserQuery({ id: userFixture.id });
    }).rejects.toThrow(InvalidBackingStateError);
});

// =================== Test helpers ===================
function expectPrivateUserDtosEqual(
    actual: GetPrivateUserDto,
    expected: GetPrivateUserDto
) {
    expect(Object.keys(actual).length).toEqual(5);
    expect(actual.id).toEqual(expected.id);
    expect(actual.username).toEqual(expected.username);
    expect(actual.email).toEqual(expected.email);
    expect(actual.createdAt).toEqual(expected.createdAt);
    expect(actual.projects).toEqual(expected.projects);
}
