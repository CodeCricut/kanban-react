import { IUserApiService } from "../../application/contracts/userApiService";
import {UserApiService} from "./service"

const service = new UserApiService();

export function useUserApiService(): IUserApiService {
    return service;    
}