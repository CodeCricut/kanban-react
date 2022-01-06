import { ColumnRepository } from "../../../persistence/column/ColumnRepository";
import { ProjectRepository } from "../../../persistence/project/ProjectRepository";
import { createValidPostColumnDto } from "../../../test-helpers/columnFixtures";
import {
    createValidPostProjectDto,
    createValidUpdateProjectDto,
} from "../../../test-helpers/projectFixtures";
import { TestDatabase } from "../../../test-helpers/TestDatabase";
import { GetProjectDto } from "../../contracts/project";
import { DeleteColumnCommand, DeleteColumnHandler } from "./deleteColumn";

const testDb = new TestDatabase();
const projectRepository = new ProjectRepository();
const columnRepository = new ColumnRepository();

const sut = new DeleteColumnHandler(columnRepository, projectRepository);

beforeAll(async () => {
    await testDb.initDatabase();
});

afterAll(async () => {
    await testDb.stopDatabase();
});

afterEach(async () => {
    await testDb.resetDatabase();
});

test("should throw if invalid project id", async () => {
    // Seed with column
    const validPostDto = createValidPostColumnDto();
    const existingColumn = await columnRepository.create(validPostDto);

    // Act
    const command: DeleteColumnCommand = {
        id: existingColumn.id,
        projectId: "INVALID PROJ ID",
    };
    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if invalid column id", async () => {
    // Seed with a project
    const postProjectDto = createValidPostProjectDto();
    const existingProject = await projectRepository.create(postProjectDto);

    // Act
    const command: DeleteColumnCommand = {
        id: "INVALID COLUMN ID",
        projectId: existingProject.id,
    };
    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if column not in project", async () => {
    // Seed with a non-parent project
    const nonParentProject = await projectRepository.create(
        createValidPostProjectDto()
    );

    // Seed with column
    const existingColumn = await columnRepository.create(
        createValidPostColumnDto()
    );

    // Act
    const command: DeleteColumnCommand = {
        id: existingColumn.id,
        projectId: nonParentProject.id,
    };
    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should remove column from project", async () => {
    // Seed with column
    const existingColumn = await columnRepository.create(
        createValidPostColumnDto()
    );

    // Seed with parent project
    let parentProject = await projectRepository.create(
        createValidPostProjectDto()
    );
    parentProject = await projectRepository.update(
        parentProject.id,
        createValidUpdateProjectDto([existingColumn.id])
    );

    // Make sure that the parent has a ref to the child for tests
    const parentColumns = getProjectColumns(parentProject);
    expect(parentColumns).toContainEqual(existingColumn.id);

    // Act
    const command: DeleteColumnCommand = {
        id: existingColumn.id,
        projectId: parentProject.id,
    };
    await sut.handle(command);

    // Make sure parent no longer has ref to child
    const updatedParent = await projectRepository.read(parentProject.id);
    let updatedColumns = getProjectColumns(updatedParent);
    expect(updatedColumns).not.toContainEqual(existingColumn.id);
});

test("should delete column", async () => {
    // Seed with column
    const existingColumn = await columnRepository.create(
        createValidPostColumnDto()
    );

    // Seed with parent project
    let parentProject = await projectRepository.create(
        createValidPostProjectDto()
    );
    parentProject = await projectRepository.update(
        parentProject.id,
        createValidUpdateProjectDto([existingColumn.id])
    );

    // Act
    const command: DeleteColumnCommand = {
        id: existingColumn.id,
        projectId: parentProject.id,
    };
    await sut.handle(command);

    // Expect column not found
    await expect(async () => {
        await columnRepository.read(existingColumn.id);
    }).rejects.toThrow(Error);
});

function getProjectColumns(project: GetProjectDto): string[] {
    // TODO: This is so hacky i want to die
    // Workaround because mongoose appends extra metadata info to the model properties,
    // so the strict equality doesn't work.
    // We are casting to a string[]
    // https://github.com/facebook/jest/issues/9624#issuecomment-596169600
    return JSON.parse(JSON.stringify(project.columns));
}
