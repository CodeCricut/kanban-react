import { ColumnRepository } from "../../../persistence/column/ColumnRepository";
import { ProjectRepository } from "../../../persistence/project/ProjectRepository";
import { createValidPostColumnDto } from "../../../test-helpers/columnFixtures";
import {
    createValidPostProjectDto,
    createValidUpdateProjectDto,
} from "../../../test-helpers/projectFixtures";
import { TestDatabase } from "../../../test-helpers/TestDatabase";
import { GetProjectDto, PostProjectDto } from "../../contracts/project";
import { ReorderColumnHandler } from "./reorderColumn";

const testDb = new TestDatabase();
const projectRepository = new ProjectRepository();
const columnRepository = new ColumnRepository();

const sut = new ReorderColumnHandler(projectRepository);

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
        await sut.handle({
            columnId: "col id",
            projectId: "INVALID PROJ ID",
            newIndex: 0,
        });
    }).rejects.toThrow(Error);
});

test("should throw if column not in project", async () => {
    // Seed with project
    const validPostProjectDto: PostProjectDto = createValidPostProjectDto();
    const project = await projectRepository.create(validPostProjectDto);

    await expect(async () => {
        await sut.handle({
            columnId: "col id",
            projectId: project.id,
            newIndex: 0,
        });
    }).rejects.toThrow(Error);
});

test("should throw if tried moving to same position", async () => {
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

    // Try moving to same index
    await expect(async () => {
        await sut.handle({
            columnId: column0.id,
            projectId: parentProject.id,
            newIndex: 0,
        });
    }).rejects.toThrow(Error);
});

test("should throw if move to negative index", async () => {
    // Seed with columns
    const column0 = await columnRepository.create(createValidPostColumnDto());

    // Seed with project
    let parentProject = await projectRepository.create(
        createValidPostProjectDto()
    );

    // Add columns to parent
    parentProject = await projectRepository.update(
        parentProject.id,
        createValidUpdateProjectDto([column0.id])
    );

    // Try moving to negative index
    await expect(async () => {
        await sut.handle({
            columnId: column0.id,
            projectId: parentProject.id,
            newIndex: -1,
        });
    }).rejects.toThrow(Error);
});
test("should throw if move to index out of range", async () => {
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

    // Try moving to index out of range
    await expect(async () => {
        await sut.handle({
            columnId: column0.id,
            projectId: parentProject.id,
            newIndex: parentProject.columns.length,
        });
    }).rejects.toThrow(Error);
});

test("should move column to new position", async () => {
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

    // Move column to new position
    const newIndex = 1;
    parentProject = await sut.handle({
        columnId: column0.id,
        projectId: parentProject.id,
        newIndex,
    });

    // Assert column at new position
    expect(parentProject.columns[newIndex].toString()).toEqual(
        column0.id.toString()
    );
});

test("should move column at new position to old position", async () => {
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

    // Move column to new position
    const newIndex = 1;
    parentProject = await sut.handle({
        columnId: column0.id,
        projectId: parentProject.id,
        newIndex,
    });

    // Assert column at new position is now at old position
    expect(parentProject.columns[0].toString()).toEqual(column1.id.toString());
});

function getProjectColumns(project: GetProjectDto): string[] {
    // TODO: This is very hacky and a workaround should be found
    // Workaround because mongoose appends extra metadata info to the model properties,
    // so the strict equality doesn't work.
    // We are casting to a string[]
    // https://github.com/facebook/jest/issues/9624#issuecomment-596169600
    return JSON.parse(JSON.stringify(project.columns));
}
