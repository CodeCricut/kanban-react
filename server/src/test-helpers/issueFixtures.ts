import { Issue } from "src/domain/issue";
import { v4 as uuid } from "uuid";
import { PostIssueDto, UpdateIssueDto } from "../application/contracts/issue";
import { dateStringFixture } from "./dateFixtures";

type CreateIssueFixtureFunction = {
    (): Issue;
};
export const createIssueFixture: CreateIssueFixtureFunction = () => ({
    issueId: uuid(),
    name: "VALID NAME",
    description: "DESCRIPTION",
    createdAt: dateStringFixture,
});