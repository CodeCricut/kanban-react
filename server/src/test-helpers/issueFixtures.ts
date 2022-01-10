import { v4 as uuid } from "uuid";
import { PostIssueDto, UpdateIssueDto } from "../application/contracts/issue";
import { dateStringFixture } from "./dateFixtures";

type createValidPostIssueDtoFunction = {
    (): PostIssueDto;
};
export const createValidPostIssueDto: createValidPostIssueDtoFunction = () => ({
    name: "VALID NAME",
    description: "DESCRIPTION",
    createdAt: dateStringFixture,
});

type createValidUpdateIssueDtoFunction = {
    (): UpdateIssueDto;
};
export const createValidUpdateIssueDto: createValidUpdateIssueDtoFunction =
    () => ({
        name: `VALID NAME (ID=${uuid()})`,
        description: `DESCRIPTION(ID=${uuid()})`,
        issues: [],
    });
