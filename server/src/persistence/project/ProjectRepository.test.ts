import { Project } from "../../domain/project";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { ProjectRepository } from "./ProjectRepository";
import {
    validPostProjectDto,
    validUpdateProjectDto,
} from "../../test-helpers/projectFixtures";
import { expectProjectsEqual } from "../../test-helpers/projectAssertions";
import { GetProjectDto } from "../../application/contracts/project";

const testDb = new TestDatabase();
const projectRepository = new ProjectRepository();

beforeAll(async () => {
    testDb.initDatabase();
});

afterAll(async () => {
    testDb.stopDatabase();
});

afterEach(async () => testDb.resetDatabase());

describe("create", () => {
    it("populates id", async () => {
        const validPostDto = validPostProjectDto;

        const created = await projectRepository.create(validPostDto);

        expect(created.id).not.toBeNull();
    });

    it("initializes columns as empty", async () => {
        const validPostDto = validPostProjectDto;

        const created = await projectRepository.create(validPostDto);

        const expected: string[] = [];
        expect(created.columns).toEqual(expected);
    });

    it("copies provided fields", async () => {
        const validPostDto = validPostProjectDto;

        const created = await projectRepository.create(validPostDto);

        expect(created.name).toEqual(validPostDto.name);
        expect(created.description).toEqual(validPostDto.description);
        expect(created.createdAt).toEqual(validPostDto.createdAt);
    });
});

describe("read", () => {
    it("returns project", async () => {
        const created = await projectRepository.create(validPostProjectDto);

        const returnedProject: GetProjectDto = await projectRepository.read(
            created.id
        );

        expect(returnedProject).not.toBeNull();
        expect(returnedProject.id).toEqual(created.id);
    });

    it("throws if not found", async () => {
        await expect(async () => {
            await projectRepository.read("NON EXISTANT ID");
        }).rejects.toThrow(Error);
    });
});

describe("readAll", () => {
    it("returns all models", async () => {
        const created = await projectRepository.create(validPostProjectDto);

        const returnedProjects: GetProjectDto[] =
            await projectRepository.readAll();

        const containsCreated = returnedProjects.some(
            (proj) => proj.id === created.id
        );
        expect(containsCreated).toBe(true);
    });
});

describe("update", () => {
    it("throws if not found", async () => {
        const updateDto = validUpdateProjectDto;
        await expect(async () => {
            await projectRepository.update("NON EXISTANT ID", updateDto);
        }).rejects.toThrow(Error);
    });

    it("updates project in database", async () => {
        // Seed with a project
        const existingProject = await projectRepository.create(
            validPostProjectDto
        );

        // Update the existing project
        const updateDto = validUpdateProjectDto;
        await projectRepository.update(existingProject.id, updateDto);

        // Requery for the project to ensure it was actually updated
        const updatedProject = await projectRepository.read(existingProject.id);

        // Assert the non-updateable fields didn't change
        expect(updatedProject.createdAt).toEqual(existingProject.createdAt);

        // Assert the updateable fields changed
        expect(updatedProject.name).toEqual(updateDto.name);
        expect(updatedProject.description).toEqual(updateDto.description);
        expect(updatedProject.columns).toEqual(updateDto.columns);
    });

    it("returns updated project", async () => {
        // Seed with a project
        const existingProject = await projectRepository.create(
            validPostProjectDto
        );

        // Update the existing project
        const updateDto = validUpdateProjectDto;
        const updatedProject = await projectRepository.update(
            existingProject.id,
            updateDto
        );

        // Assert the project was returned
        expect(updatedProject).not.toBeNull();

        // Assert the updateable fields changed
        expect(updatedProject.name).toEqual(updateDto.name);
        expect(updatedProject.description).toEqual(updateDto.description);
        expect(updatedProject.columns).toEqual(updateDto.columns);
    });
});
