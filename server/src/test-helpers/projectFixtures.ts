import { v4 as uuid } from "uuid";
import { Project } from "../domain/project";
import { dateStringFixture } from "./dateFixtures";

// type CreateValidPostProjectDtoFunction = {
//     (): PostProjectDto;
// };
// export const createValidPostProjectDto: CreateValidPostProjectDtoFunction =
//     () => ({
//         name: "VALID NAME",
//         description: "DESCRIPTION",
//         createdAt: dateStringFixture,
//     });

// type CreateValidUpdateProjectDtoFunction = {
//     (columns?: string[]): UpdateProjectDto;
// };
// export const createValidUpdateProjectDto: CreateValidUpdateProjectDtoFunction =
//     (columns?: string[]) => ({
//         name: `UPDATED NAME (ID=${uuid()})`,
//         description: `UPDATED DESCRIPTION (ID=${uuid()})`,
//         columns: columns ?? [],
//     });

// type CreateValidGetProjectDtoFunction = {
//     (columnIds: string[]): GetProjectDto;
// };
// export const createValidGetProjectDto: CreateValidGetProjectDtoFunction = (
//     columnIds: string[] = []
// ) => ({
//     columns: columnIds,
//     createdAt: dateStringFixture,
//     id: uuid(),
//     name: `NAME ${uuid()}`,
//     description: `DESCRIPTION ${uuid()}`,
// });

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
