import { v4 as uuid } from "uuid";
import { Project } from "../domain/project";
import { dateStringFixture } from "./dateFixtures";

type CreateProjectFixtureFunction = {
    (): Project;
};
export const createProjectFixture: CreateProjectFixtureFunction = () => ({
    id: uuid(),
    name: `NAME ${uuid()}`,
    description: `DESCRIPTION ${uuid()}`,
    createdAt: dateStringFixture,
    columns: [],
    users: [],
});
