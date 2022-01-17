import { PrivateUser } from "../../domain/privateUser";
import { IJwtStorageService } from "../contracts/jwtStorageService"
import { IUserApiService } from "../contracts/userApiService";

export type Dependencies = {
    jwtStorageService: IJwtStorageService;
    userApiService: IUserApiService;
}
export async function getLoggedInUser({jwtStorageService, userApiService}: Dependencies)
    :Promise<PrivateUser|undefined> {
    const jwt = jwtStorageService.jwt;
    if (!jwt) return undefined;

    return await userApiService.getMe(jwt)
}