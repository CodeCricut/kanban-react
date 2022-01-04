import { ColumnRepository } from "../../persistence/column/ColumnRepository";
import { ProjectRepository } from "../../persistence/project/ProjectRepository";
import { createValidPostColumnDto } from "../../test-helpers/columnFixtures";
import {
    createValidPostProjectDto,
    createValidUpdateProjectDto,
} from "../../test-helpers/projectFixtures";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { GetProjectDto, PostProjectDto } from "../contracts/project";
import { ReorderColumnRightHandler } from "./reorderColumnRight";

const testDb = new TestDatabase();
const projectRepository = new ProjectRepository();
const columnRepository = new ColumnRepository();

const sut = new ReorderColumnRightHandler(projectRepository);

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
    await expect(async () => {
        await sut.handle({ columnId: "col id", projectId: "INVALID PROJ ID" });
    }).rejects.toThrow(Error);
});

test("should throw if column not in project", async () => {
    // Seed with project
    const validPostProjectDto: PostProjectDto = createValidPostProjectDto();
    const project = await projectRepository.create(validPostProjectDto);

    await expect(async () => {
        await sut.handle({ columnId: "col id", projectId: project.id });
    }).rejects.toThrow(Error);
});

test("should throw if column can't move right", async () => {
    // Seed with column
    const validPostDto = createValidPostColumnDto();
    const column = await columnRepository.create(validPostDto);

    // Seed with project
    const validPostProjectDto: PostProjectDto = createValidPostProjectDto();
    const parentProject = await projectRepository.create(validPostProjectDto);

    // Add column to parent
    await projectRepository.update(
        parentProject.id,
        createValidUpdateProjectDto([column.id])
    );

    // Should throw since can't move last column right
    await expect(async () => {
        await sut.handle({ columnId: column.id, projectId: parentProject.id });
    }).rejects.toThrow(Error);
});

test("should move column right", async () => {
    // Seed with columns
    const column0 = await columnRepository.create(createValidPostColumnDto());
    const column1 = await columnRepository.create(createValidPostColumnDto());

    // Seed with project
    let parentProject = await projectRepository.create(
        createValidPostProjectDto()
    );

    // Add columns to parent
    parentProject = await projectRepository.update(
        parentProject.id,
        createValidUpdateProjectDto([column0.id, column1.id])
    );

    // Ensure project columns in right order for tests
    const projColumns = getProjectColumns(parentProject);
    expect(projColumns[0]).toEqual(column0.id);
    expect(projColumns[1]).toEqual(column1.id);

    // Move column at beginning right
    const updatedProject = await sut.handle({
        columnId: column0.id,
        projectId: parentProject.id,
    });

    // Expect column to be moved right
    const updateColumns = getProjectColumns(updatedProject);

    expect(updateColumns[1]).toEqual(column0.id);
    expect(updateColumns[0]).toEqual(column1.id);
});

function getProjectColumns(project: GetProjectDto): string[] {
    // TODO: This is so hacky i want to die
    // Workaround because mongoose appends extra metadata info to the model properties,
    // so the strict equality doesn't work.
    // We are casting to a string[]
    // https://github.com/facebook/jest/issues/9624#issuecomment-596169600
    return JSON.parse(JSON.stringify(project.columns));
}
