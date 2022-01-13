import { v4 as uuid } from "uuid";

import { GetColumnDto, PostColumnDto } from "../application/contracts/column";
import { Column } from "../domain/column";
import { dateStringFixture } from "./dateFixtures";

type CreateColumnFixtureFunction = {
    (): Column;
};
export const createColumnFixture: CreateColumnFixtureFunction = () => ({
    columnId: uuid(),
    name: `NAME ${uuid()}`,
    description: `DESCRIPTION ${uuid()}`,
    createdAt: dateStringFixture,
    issues: [],
});
