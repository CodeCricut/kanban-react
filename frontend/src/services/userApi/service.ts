import axios from "axios";
import { IUserApiService } from "../../application/contracts/userApiService";
import { appConfig } from "../../config";
import { PrivateUser } from "../../domain/privateUser";

export class UserApiService implements IUserApiService {
    getMe = async (jwt: string): Promise<PrivateUser | undefined> => {
        const requestHeaders = {
            'token': jwt
        }
        const response = await axios.get(appConfig.getMeRoute, {
            headers: requestHeaders
        })
        const returnedUser: PrivateUser|undefined = response.data
        return returnedUser
    }
}