import { Project } from "../../domain/project";
import { IJwtStorageService } from "../contracts/jwtStorageService";
import { IUserApiService } from "../contracts/userApiService";

type Dependencies = {
    jwtStorageService: IJwtStorageService;
    usersApiService: IUserApiService
}
export async function getUsersProjects({jwtStorageService, usersApiService}: Dependencies): Promise<Project[]|undefined> {
    const jwt = jwtStorageService.jwt;
    if (!jwt) return undefined;
    return await usersApiService.getMyProjects(jwt)
}