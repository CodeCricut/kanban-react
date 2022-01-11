import * as projectRepository from "../../persistence/repository/ProjectRepository";
import * as userRepository from "../../persistence/repository/UserRepository";
import * as dates from "../../library/dates";

import { dateStringFixture } from "../../test-helpers/dateFixtures";
import { createUserFixture } from "../../test-helpers/userFixtures";
import { Project } from "../../domain/project";
import { createProjectFixture } from "../../test-helpers/projectFixtures";
import { User } from "../../domain/user";
import { handleDeleteProjectCommand } from "./deleteProject";
import { NotAuthenticatedError, NotAuthorizedError } from "../errors";

// =================== Test setup ===================
let userFixture: User;
const currTimeStringFixture = dateStringFixture;
let projectFixture: Project;

const getUserByIdSpy = jest.spyOn(userRepository, "getUserById");
const updateUserSpy = jest.spyOn(userRepository, "updateUser");
const getCurrentDateTimeStringSpy = jest.spyOn(
    dates,
    "getCurrentDateTimeString"
);
const getProjectByIdSpy = jest.spyOn(projectRepository, "getProjectById");
const deleteProjectSpy = jest.spyOn(projectRepository, "deleteProject");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    projectFixture = createProjectFixture();

    // Fixtures have existing relationship
    projectFixture.users = [userFixture.id];
    userFixture.projects = [projectFixture.id];

    getUserByIdSpy.mockResolvedValue(userFixture);
    updateUserSpy.mockResolvedValue(userFixture);
    getCurrentDateTimeStringSpy.mockReturnValue(currTimeStringFixture);
    getProjectByIdSpy.mockResolvedValue(projectFixture);
    deleteProjectSpy.mockResolvedValue();
});

// =================== Test cases ===================
test("should remove project", async () => {
    // Act
    await handleDeleteProjectCommand({
        id: projectFixture.id,
        userId: userFixture.id,
    });

    expect(deleteProjectSpy).toHaveBeenCalledWith(projectFixture.id);
});

test("should remove project reference from user", async () => {
    // Act
    await handleDeleteProjectCommand({
        id: projectFixture.id,
        userId: userFixture.id,
    });

    // Expect user to have reference to project
    expect(updateUserSpy).toHaveBeenLastCalledWith(userFixture.id, {
        ...userFixture,
        projects: [], // since fixture had one proj, should not be empty
    });
});

test("should throw if not authenticated", async () => {
    // User not found
    getUserByIdSpy.mockResolvedValue(null);

    // Act
    await expect(async () => {
        await handleDeleteProjectCommand({
            id: projectFixture.id,
            userId: userFixture.id,
        });
    }).rejects.toThrow(NotAuthenticatedError);
});

test("should throw if not authorized", async () => {
    // User does not own project
    getUserByIdSpy.mockResolvedValue({ ...userFixture, projects: [] });

    // Act
    await expect(async () => {
        await handleDeleteProjectCommand({
            id: projectFixture.id,
            userId: userFixture.id,
        });
    }).rejects.toThrow(NotAuthorizedError);
});
