import axios from "axios";
import { IAuthApiService } from "../../application/contracts/authApiService";
import {appConfig} from "../../config"

export class AuthApiService implements IAuthApiService {
    registerUser = async (username: string, email: string, password: string): Promise<string | null> => {
        const requestBody = {
            username,
            email,
            password
        }
        const response = await axios.post(appConfig.registerRoute, requestBody);
        const returnedJwt: string= response.data?.jwt;
        return returnedJwt
    }

    login = async (username: string, password: string): Promise<string | undefined> => {
        const requestBody = {
            username,
            password
        }
        const response = await axios.post(appConfig.loginRoute, requestBody);
        const returnedJwt: string = response.data?.jwt;
        return returnedJwt
    }
}