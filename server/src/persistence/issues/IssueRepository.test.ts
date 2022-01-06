import { createValidPostIssueDto } from "../../test-helpers/issueFixtures";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import { IssueRepository } from "./IssueRepository";

const testDb = new TestDatabase();
const issueRepository = new IssueRepository();

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
        const validPostDto = createValidPostIssueDto();
        const created = await issueRepository.create(validPostDto);

        expect(created.id).not.toBeNull();
    });

    it("initializes issues as empty", async () => {
        const validPostDto = createValidPostIssueDto();
        const created = await issueRepository.create(validPostDto);

        expect(created.id).not.toBeNull();
    });

    it("copies provided fields", async () => {
        const validPostDto = createValidPostIssueDto();
        const created = await issueRepository.create(validPostDto);

        expect(created.name).toEqual(validPostDto.name);
        expect(created.description).toEqual(validPostDto.description);
        expect(created.createdAt).toEqual(validPostDto.createdAt);
    });
});
