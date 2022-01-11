import * as projectRepository from "../../persistence/repository/ProjectRepository";
import * as userRepository from "../../persistence/repository/UserRepository";
import * as dates from "../../library/dates";

import { dateStringFixture } from "../../test-helpers/dateFixtures";
import { createUserFixture } from "../../test-helpers/userFixtures";
import { editProject, Project } from "../../domain/project";
import { createProjectFixture } from "../../test-helpers/projectFixtures";
import { User } from "../../domain/user";
import { handleDeleteProjectCommand } from "./deleteProject";
import { NotAuthenticatedError, NotAuthorizedError } from "../errors";
import { handleEditProjectCommand } from "./editProject";

// =================== Test setup ===================
let userFixture: User;
let originalProjectFixture: Project;
let updatedProjectFixture: Project;

const getUserByIdSpy = jest.spyOn(userRepository, "getUserById");
const getProjectByIdSpy = jest.spyOn(projectRepository, "getProjectById");
const updateProjectSpy = jest.spyOn(projectRepository, "updateProject");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    originalProjectFixture = createProjectFixture();
    updatedProjectFixture = editProject(
        originalProjectFixture,
        "new name",
        "new desc"
    );

    // Fixtures have existing relationship
    originalProjectFixture.users = [userFixture.id];
    userFixture.projects = [originalProjectFixture.id];

    getUserByIdSpy.mockResolvedValue(userFixture);
    getProjectByIdSpy.mockResolvedValue(originalProjectFixture);
    updateProjectSpy.mockResolvedValue(updatedProjectFixture);
});

// =================== Test cases ===================
test("should update project", async () => {
    // Act
    await handleEditProjectCommand({
        id: originalProjectFixture.id,
        userId: userFixture.id,
        name: "new name",
        description: "new desc",
    });

    expect(updateProjectSpy).toHaveBeenCalledWith(
        originalProjectFixture.id,
        editProject(originalProjectFixture, "new name", "new desc")
    );
});

test("should throw if not authenticated", async () => {
    // User not found
    getUserByIdSpy.mockResolvedValue(null);

    // Act
    await expect(async () => {
        await handleEditProjectCommand({
            id: originalProjectFixture.id,
            userId: userFixture.id,
            name: "kljlka",
            description: "kldja",
        });
    }).rejects.toThrow(NotAuthenticatedError);
});

test("should throw if not authorized", async () => {
    // User does not own project
    getUserByIdSpy.mockResolvedValue({ ...userFixture, projects: [] });

    // Act
    await expect(async () => {
        await handleEditProjectCommand({
            id: originalProjectFixture.id,
            userId: userFixture.id,
            name: "kljlka",
            description: "kldja",
        });
    }).rejects.toThrow(NotAuthorizedError);
});
