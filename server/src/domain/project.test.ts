import { createColumnFixture } from "../test-helpers/columnFixtures";
import { createProjectFixture } from "../test-helpers/projectFixtures";
import { createUserFixture } from "../test-helpers/userFixtures";
import { createIssueFixture } from "../test-helpers/issueFixtures";
import { Column } from "./column";
import {
    addColumnToProject,
    addUserToProject,
    copyProject,
    editProject,
    Project,
    relocateProjectIssue,
} from "./project";
import { User } from "./user";

// =================== Test setup ===================
let projectFixture: Project;
let columnFixture: Column;
let userFixture: User;

beforeEach(() => {
    projectFixture = createProjectFixture();
    columnFixture = createColumnFixture();
    userFixture = createUserFixture("pwd");
});

// =================== Test cases ===================
describe("addUserToProject", () => {
    it("adds user id to project", () => {
        const newProject = addUserToProject(userFixture, projectFixture, 0);

        expect(newProject.users[0]).toBe(userFixture.id);
    });

    it("does not modify original", () => {
        const originalRef = copyProject(projectFixture);
        addUserToProject(userFixture, projectFixture, 0);
        expectProjectsEqual(originalRef, projectFixture);
    });
});

describe("editProject", () => {
    it("updates name and description", () => {
        const newName = "updated name";
        const newDesc = "updated desc";
        const expected = {
            ...projectFixture,
            name: newName,
            description: newDesc,
        };

        const actual = editProject(projectFixture, newName, newDesc);

        expectProjectsEqual(expected, actual);
    });

    it("does not modify original", () => {
        const originalRef = { ...projectFixture };
        editProject(projectFixture, "newName", "newDesc");
        expectProjectsEqual(originalRef, projectFixture);
    });
});

describe("addColumnToProject", () => {
    it("adds column at index", () => {
        const newProject = addColumnToProject(projectFixture, columnFixture, 0);

        expect(newProject.columns[0]).toBe(columnFixture);
    });

    it("does not modify original project", () => {
        const originalRef = copyProject(projectFixture);
        addColumnToProject(projectFixture, columnFixture, 0);

        // Expect original to be unchanged
        expectProjectsEqual(originalRef, projectFixture);
    });
});

describe("copyProject", () => {
    it("contains correct project fields", () => {
        const original = projectFixture;
        const copy = copyProject(original);
        expectProjectsEqual(original, copy);
    });

    it("is actually a copy", () => {
        const project = projectFixture;
        const originalReference = { ...project };
        const copy = copyProject(project);
        // Modify copy
        copy.name = "updated name";
        copy.users.push("newuserid");

        // Expect original unchanged
        expectProjectsEqual(originalReference, project);
    });
});

describe("relocateProjectIssue", () => {
    it("relocates issue to new column", () => {
        const issue = createIssueFixture()

        const oldColumn = createColumnFixture()
        oldColumn.issues.push(issue)

        const newColumn = createColumnFixture()

        const oldProject = createProjectFixture()
        oldProject.columns.push(oldColumn)
        oldProject.columns.push(newColumn)
        
        const newProject = relocateProjectIssue(oldProject, issue.issueId, newColumn.columnId, 0)

        // Expect new column to have issue
        const newColumnInProj = newProject.columns.find(col => col.columnId == newColumn.columnId)
        expect(newColumnInProj?.issues[0].issueId).toBe(issue.issueId)

        // Expect old column not to have issue
        const oldColumnInProj = newProject.columns.find(col => col.columnId == oldColumn.columnId)
        expect(oldColumnInProj?.issues.length).toBe(0)
    })
})

// =================== Test helpers ===================
function expectProjectsEqual(expected: Project, actual: Project) {
    expect(expected.columns).toEqual(actual.columns);
    expect(expected.createdAt).toEqual(actual.createdAt);
    expect(expected.description).toEqual(actual.description);
    expect(expected.id).toEqual(actual.id);
    expect(expected.name).toEqual(actual.name);
    expect(expected.users).toEqual(actual.users);
}
