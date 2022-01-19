import { Project } from "../../domain/project";
import { IJwtStorageService } from "../contracts/jwtStorageService";
import { IUserApiService } from "../contracts/userApiService";

type Dependencies = {
    usersApiService: IUserApiService
}
export async function getUsersProjects({usersApiService}: Dependencies): Promise<Project[]|undefined> {
    return await usersApiService.getMyProjects()
}