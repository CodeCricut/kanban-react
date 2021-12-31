import { PostProjectDto } from "../application/contracts/project";
import { validCreatedAtString } from "./dateFixtures";

export const validPostProjectDto: PostProjectDto = {
    name: "VALID NAME",
    description: "DESCRIPTION",
    createdAt: validCreatedAtString,
};
