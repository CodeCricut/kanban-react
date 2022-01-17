import {useMemo} from "react"
import { IAuthApiService } from "../../application/contracts/authApiService";
import { AuthApiService } from "./service"
const service = new AuthApiService()

export function useAuthApiService() : IAuthApiService{
    return service;
}