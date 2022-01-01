import {
    PostProjectDto,
    UpdateProjectDto,
} from "../application/contracts/project";
import { validCreatedAtString } from "./dateFixtures";

export const validPostProjectDto: PostProjectDto = {
    name: "VALID NAME",
    description: "DESCRIPTION",
    createdAt: validCreatedAtString,
};

export const validUpdateProjectDto: UpdateProjectDto = {
    name: "UPDATED NAME",
    description: "UPDATED DESCRIPTION",
    columns: [],
};
