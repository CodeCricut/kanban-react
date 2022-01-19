import { PrivateUser } from "../../domain/privateUser";
import { IJwtStorageService } from "../contracts/jwtStorageService"
import { IUserApiService } from "../contracts/userApiService";

export type Dependencies = {
    userApiService: IUserApiService;
}
export async function getLoggedInUser({ userApiService}: Dependencies)
    :Promise<PrivateUser|undefined> {
    return userApiService.getMe()
}