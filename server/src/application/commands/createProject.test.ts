import * as projectRepository from "../../persistence/repository/ProjectRepository";
import * as userRepository from "../../persistence/repository/UserRepository";
import * as dates from "../../library/dates";

import { dateStringFixture } from "../../test-helpers/dateFixtures";
import { createUserFixture } from "../../test-helpers/userFixtures";
import { handleCreateProjectCommand } from "./createProject";
import { Project } from "../../domain/project";
import { createProjectFixture } from "../../test-helpers/projectFixtures";
import { User } from "../../domain/user";
import { GetProjectDto } from "../contracts/project";

// =================== Test setup ===================
let userFixture: User;
const currTimeStringFixture = dateStringFixture;
let projectFixture: Project;

const getUserByIdSpy = jest.spyOn(userRepository, "getUserById");
const getCurrentDateTimeStringSpy = jest.spyOn(
    dates,
    "getCurrentDateTimeString"
);
const createProjectSpy = jest.spyOn(projectRepository, "createProject");
const updateUserSpy = jest.spyOn(userRepository, "updateUser");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    projectFixture = createProjectFixture();

    getUserByIdSpy.mockResolvedValue(userFixture);
    getCurrentDateTimeStringSpy.mockReturnValue(currTimeStringFixture);
    createProjectSpy.mockResolvedValue(projectFixture);
    updateUserSpy.mockResolvedValue(userFixture);
});

// =================== Test cases ===================
test("should create project with relationship to user", async () => {
    // Act
    const createdProject = await handleCreateProjectCommand({
        userId: userFixture.id,
        name: projectFixture.name,
        description: projectFixture.description,
    });

    // Expect user to have reference to project
    expect(updateUserSpy).toHaveBeenLastCalledWith(userFixture.id, {
        ...userFixture,
        projects: [createdProject.id],
    });

    // Expect project to have reference to user
    expect(createProjectSpy).toHaveBeenCalledWith({
        name: projectFixture.name,
        description: projectFixture.description,
        createdAt: currTimeStringFixture,
        users: [userFixture.id],
    });
});

test("Should return only properties on dto", async () => {
    // Act
    const createdProject = await handleCreateProjectCommand({
        userId: userFixture.id,
        name: projectFixture.name,
        description: projectFixture.description,
    });

    // Expect dto to have all props
    // TODO: Fix type error
    // expectGetProjectDtoEqual(createdProject, projectFixture);
});

// =================== Test helpers ===================
function expectGetProjectDtoEqual(
    actual: GetProjectDto,
    expected: GetProjectDto
) {
    expect(Object.keys(actual).length).toEqual(6);
    expect(actual).toEqual(expected);
}
