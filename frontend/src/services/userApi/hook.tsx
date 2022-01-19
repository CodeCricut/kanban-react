import { useMemo } from "react";
import { IUserApiService } from "../../application/contracts/userApiService";
import { useJwtStorageService } from "../jwtStorage/hook";
import {UserApiService} from "./service"

export function useUserApiService(): IUserApiService {
    const jwtService = useJwtStorageService();
    const service = useMemo(() => new UserApiService(jwtService), [jwtService]);
    return service;
}