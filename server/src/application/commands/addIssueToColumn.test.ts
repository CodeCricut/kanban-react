import { ColumnRepository } from "../../persistence/column/ColumnRepository";
import { IssueRepository } from "../../persistence/issues/IssueRepository";
import { createValidPostColumnDto } from "../../test-helpers/columnFixtures";
import { createValidPostIssueDto } from "../../test-helpers/issueFixtures";
import { TestDatabase } from "../../test-helpers/TestDatabase";
import {
    AddIssueToColumn as AddIssueToColumnCommand,
    AddIssueToColumnHandler,
} from "./addIssueToColumn";

const testDb = new TestDatabase();
const columnRepository = new ColumnRepository();
const issueRepository = new IssueRepository();

const sut = new AddIssueToColumnHandler(columnRepository, issueRepository);

beforeAll(async () => {
    await testDb.initDatabase();
});

afterAll(async () => {
    await testDb.stopDatabase();
});

afterEach(async () => {
    await testDb.resetDatabase();
});

test("should throw if invalid column id", async () => {
    const validPostDto = createValidPostIssueDto();
    const command: AddIssueToColumnCommand = {
        columnId: "INVALID ID",
        ...validPostDto,
        issueIndex: 0,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if index below range", async () => {
    const postColDto = createValidPostColumnDto();
    const column = await columnRepository.create(postColDto);

    const postIssueDto = createValidPostIssueDto();
    const command: AddIssueToColumnCommand = {
        columnId: column.id,
        ...postIssueDto,
        issueIndex: -1,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should throw if index above range", async () => {
    const postColDto = createValidPostColumnDto();
    const column = await columnRepository.create(postColDto);

    const postIssueDto = createValidPostIssueDto();
    const command: AddIssueToColumnCommand = {
        columnId: column.id,
        ...postIssueDto,
        issueIndex: column.issues.length + 1,
    };

    await expect(async () => {
        await sut.handle(command);
    }).rejects.toThrow(Error);
});

test("should add created issue to column at correct index", async () => {
    // Seed with column
    const postColDto = createValidPostColumnDto();
    const column = await columnRepository.create(postColDto);

    const postIssueDto = createValidPostIssueDto();
    const command: AddIssueToColumnCommand = {
        columnId: column.id,
        ...postIssueDto,
        issueIndex: column.issues.length,
    };

    // Act
    const responseColumn = await sut.handle(command);

    // Assert
    const issueAtIndex = responseColumn.issues[command.issueIndex];

    const issueWithId = await issueRepository.read(issueAtIndex);
    expect(issueWithId.name).toEqual(command.name);
});
