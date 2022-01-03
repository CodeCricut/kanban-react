import { GetColumnDto } from "../../application/contracts/column";
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

describe("readArray", () => {
    it("returns all columns in array", async () => {
        // Seed with columns
        const columns: GetColumnDto[] = [];
        for (let i = 0; i < 10; i++) {
            const created = await columnRepository.create(
                createValidPostColumnDto()
            );
            columns.push(created);
        }

        // Query some columns
        const ids = [columns[0].id, columns[2].id, columns[3].id];
        const response = await columnRepository.readArray(ids);

        // Expect columns returned
        expect(response.length).toBe(ids.length);
        for (let i = 0; i < ids.length; i++) {
            const containsCol = response.some((col) => col.id === ids[i]);
            expect(containsCol).toBe(true);
        }
    });

    it("throws if any column not found", async () => {
        // Seed with columns
        const columns: GetColumnDto[] = [];
        for (let i = 0; i < 10; i++) {
            const created = await columnRepository.create(
                createValidPostColumnDto()
            );
            columns.push(created);
        }

        // Query with some invalid ids
        const ids = [columns[0].id, "INVALID ID", columns[3].id];

        // Expect error
        await expect(async () => {
            await columnRepository.readArray(ids);
        }).rejects.toThrow(Error);
    });
});