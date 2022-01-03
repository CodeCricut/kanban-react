import { ColumnRepository } from "../../persistence/column/ColumnRepository";
import { ProjectRepository } from "../../persistence/project/ProjectRepository";
import { createValidPostColumnDto } from "../../test-helpers/columnFixtures";
import { createValidPostProjectDto } from "../../test-helpers/projectFixtures";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { PostProjectDto } from "../contracts/project";
import {
    AddColumnToProjectCommand,
    AddColumnToProjectHandler,
} from "./addColumnToProject";

const testDb = new TestDatabase();
const projectRepository = new ProjectRepository();
const columnRepository = new ColumnRepository();

let sut = new AddColumnToProjectHandler(projectRepository, columnRepository);

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
    const validPostDto = createValidPostColumnDto();
    const command: AddColumnToProjectCommand = {
        projectId: "INVALID ID",
        ...validPostDto,
        columnIndex: 0,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if index below range", async () => {
    const validPostDto = createValidPostColumnDto();
    const project = await projectRepository.create(validPostDto);

    const command: AddColumnToProjectCommand = {
        projectId: project.id,
        ...validPostDto,
        columnIndex: -1,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if index above range", async () => {
    const validPostDto = createValidPostColumnDto();
    const project = await projectRepository.create(validPostDto);

    const command: AddColumnToProjectCommand = {
        projectId: project.id,
        ...validPostDto,
        columnIndex: project.columns.length + 1,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should add created column to project at correct index", async () => {
    // Seed with project
    const validPostProjectDto: PostProjectDto = createValidPostProjectDto();
    const project = await projectRepository.create(validPostProjectDto);

    const validPostColumnDto = createValidPostColumnDto();
    const command: AddColumnToProjectCommand = {
        projectId: project.id,
        ...validPostColumnDto,
        columnIndex: project.columns.length, // insert at last possible index (not exhaustive, but good enough)
    };

    // Act
    const responseProject = await sut.handle(command);

    // Assert
    const columnIdAtIndex = responseProject.columns[command.columnIndex];

    const columnWithId = await columnRepository.read(columnIdAtIndex);
    expect(columnWithId.name).toEqual(command.name);
});
