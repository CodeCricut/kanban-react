import { createValidPostColumnDto } from "../../test-helpers/columnFixtures";
import { createValidPostProjectDto } from "../../test-helpers/projectFixtures";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { ColumnRepository } from "./ColumnRepository";

const testDb = new TestDatabase();
const columnRepository = new ColumnRepository();

beforeAll(async () => {
    await testDb.initDatabase();
});

afterAll(async () => {
    await testDb.stopDatabase();
});

afterEach(async () => {
    await testDb.resetDatabase();
});

describe("create", () => {
    it("populates id", async () => {
        const validPostDto = createValidPostColumnDto();
        const created = await columnRepository.create(validPostDto);

        expect(created.id).not.toBeNull();
    });

    it("initializes issues as empty", async () => {
        const validPostDto = createValidPostColumnDto();
        const created = await columnRepository.create(validPostDto);

        expect(created.id).not.toBeNull();
    });

    it("copies provided fields", async () => {
        const validPostDto = createValidPostColumnDto();
        const created = await columnRepository.create(validPostDto);

        expect(created.name).toEqual(validPostDto.name);
        expect(created.description).toEqual(validPostDto.description);
        expect(created.createdAt).toEqual(validPostDto.createdAt);
    });
});

describe("read", () => {
    it("returns column", async () => {
        // Seed with column
        const validPostDto = createValidPostColumnDto();
        const created = await columnRepository.create(validPostDto);

        const returned = await columnRepository.read(created.id);
        expect(returned.id).toEqual(created.id);
        expect(returned.name).toEqual(created.name);
        // ...
    });

    it("throws if not found", async () => {
        await expect(async () => [
            await columnRepository.read("INVALID ID"),
        ]).rejects.toThrow(Error);
    });
});
