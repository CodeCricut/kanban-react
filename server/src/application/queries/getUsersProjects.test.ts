import * as projectRepository from "../../persistence/repository/ProjectRepository";
import * as userRepository from "../../persistence/repository/UserRepository";

import { createUserFixture } from "../../test-helpers/userFixtures";
import { createProjectFixture } from "../../test-helpers/projectFixtures";
import { User } from "../../domain/user";
import { InvalidBackingStateError, NotAuthenticatedError } from "../errors";
import { Project } from "../../domain/project";
import { handleGetUserProjects } from "./getUsersProjects";

// =================== Test setup ===================
let userFixture: User;
let projectFixtures: Project[];

const getUserByIdSpy = jest.spyOn(userRepository, "getUserById");
const getProjectByIdsSpy = jest.spyOn(projectRepository, "getProjectsByIds");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    projectFixtures = [];
    projectFixtures.push(createProjectFixture());
    projectFixtures.push(createProjectFixture());
    projectFixtures.push(createProjectFixture());

    // Fixtures have existing relationship
    userFixture.projects = projectFixtures.map((proj) => proj.id);

    getUserByIdSpy.mockResolvedValue(userFixture);
    getProjectByIdsSpy.mockResolvedValue(projectFixtures);
});

// =================== Test cases ===================
test("should return user's projects", async () => {
    // Act
    const projects = await handleGetUserProjects({ userId: userFixture.id });

    // Expect each project to be included
    const projFixtureIds: string[] = projectFixtures.map((proj) => proj.id);
    for (let i = 0; i < projects.length; i++) {
        expect(projFixtureIds).toContain(projects[i].id);
    }
});

test("should throw if user contains ref to deleted project", async () => {
    // Return null entity when querying
    getProjectByIdsSpy.mockResolvedValue([
        projectFixtures[0],
        null,
        projectFixtures[2],
    ]);

    // Act
    await expect(async () => {
        await handleGetUserProjects({ userId: userFixture.id });
    }).rejects.toThrow(InvalidBackingStateError);
});

test("should throw if not authenticated", async () => {
    getUserByIdSpy.mockResolvedValue(null);

    // Act
    await expect(async () => {
        await handleGetUserProjects({ userId: userFixture.id });
    }).rejects.toThrow(NotAuthenticatedError);
});
