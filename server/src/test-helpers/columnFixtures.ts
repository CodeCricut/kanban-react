import { v4 as uuid } from "uuid";

import {
    GetColumnDto,
    PostColumnDto,
    UpdateColumnDto,
} from "../application/contracts/column";
import { validCreatedAtString } from "./dateFixtures";

type createValidPostColumnDtoFunction = {
    (): PostColumnDto;
};
export const createValidPostColumnDto: createValidPostColumnDtoFunction =
    () => ({
        name: "VALID NAME",
        description: "DESCRIPTION",
        createdAt: validCreatedAtString,
    });

type createValidUpdateColumnDtoFunction = {
    (): UpdateColumnDto;
};
export const createValidUpdateColumnDto: createValidUpdateColumnDtoFunction =
    () => ({
        name: `VALID NAME (ID=${uuid()})`,
        description: `DESCRIPTION(ID=${uuid()})`,
        issues: [],
    });

type createValidGetColumnDtoFunctin = {
    (): GetColumnDto;
};
export const createValidGetColumnDto: createValidGetColumnDtoFunctin = () => ({
    id: uuid(),
    name: `VALID NAME (ID=${uuid()})`,
    description: `DESCRIPTION(ID=${uuid()})`,
    issues: [],
    createdAt: validCreatedAtString,
});
