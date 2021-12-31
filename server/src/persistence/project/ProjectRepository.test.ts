import { Project } from "../../domain/project";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { ProjectRepository } from "./ProjectRepository";
import { validPostProjectDto } from "../../test-helpers/projectFixtures";
import { expectProjectsEqual } from "../../test-helpers/projectAssertions";

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
