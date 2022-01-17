import { useCallback } from "react"
import { useAuthApiService } from "../../services/authApi/hook";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { login } from "./login"

type LoginFunction = {
    (username: string, password: string): Promise<boolean>
}
export function useLogin(): LoginFunction{
    const authApiService = useAuthApiService();
    const jwtStorageService = useJwtStorageService();
    
    const func = useCallback((username: string, password: string) => (
        login(username, password, {
            authApiService,
            jwtStorageService
        })), 
    []);

    return func;
}