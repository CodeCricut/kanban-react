import { createColumnFixture } from "../test-helpers/columnFixtures";
import { createProjectFixture } from "../test-helpers/projectFixtures";
import { createUserFixture } from "../test-helpers/userFixtures";
import { Column } from "./column";
import { EntityNotInParentError } from "./errors";
import { copyProject, Project } from "./project";
import {
    addProjectToUser,
    copyUser,
    removeProjectFromUser,
    User,
} from "./user";

// =================== Test setup ===================
let userFixture: User;
let projectFixture: Project;

beforeEach(() => {
    projectFixture = createProjectFixture();
    userFixture = createUserFixture("pwd");
});

// =================== Test cases ===================
describe("addProjectToUser", () => {
    it("adds project id to user", () => {
        const newUser = addProjectToUser(projectFixture, userFixture, 0);

        expect(newUser.projects[0]).toBe(projectFixture.id);
    });

    it("does not modify original", () => {
        const originalRef = copyUser(userFixture);
        addProjectToUser(projectFixture, userFixture, 0);
        expectUsersEqual(originalRef, userFixture);
    });
});

describe("removeProjectFromUser", () => {
    it("removes project id to user", () => {
        // Add project to user to begin
        const userWithProject = addProjectToUser(
            projectFixture,
            userFixture,
            0
        );
        expect(userWithProject.projects.length).toBe(1);

        // Remove it
        const result = removeProjectFromUser(projectFixture, userWithProject);

        // Make sure result doesn't have project
        expect(result.projects.length).toBe(0);
    });

    it("throws if project id not in user", () => {
        expect(() => {
            removeProjectFromUser(projectFixture, userFixture);
        }).toThrow(EntityNotInParentError);
    });

    it("does not modify original", () => {
        // Add project to user to begin
        const userWithProject = addProjectToUser(
            projectFixture,
            userFixture,
            0
        );
        const originalRef = copyUser(userWithProject);

        expect(userWithProject.projects.length).toBe(1);

        // Remove it
        removeProjectFromUser(projectFixture, userWithProject);

        // Make sure original unmodified
        expectUsersEqual(originalRef, userWithProject);
    });
});

// =================== Test helpers ===================
function expectUsersEqual(expected: User, actual: User) {
    expect(expected.createdAt).toEqual(actual.createdAt);
    expect(expected.email).toEqual(actual.email);
    expect(expected.id).toEqual(actual.id);
    expect(expected.passwordHash).toEqual(actual.passwordHash);
    expect(expected.projects).toEqual(actual.projects);
    expect(expected.username).toEqual(actual.username);
}
