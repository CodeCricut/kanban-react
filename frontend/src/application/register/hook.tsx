import { useCallback } from "react"
import { useAuthApiService } from "../../services/authApi/hook";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { register } from "./register"

type RegisterFunction = {
    (username: string, email: string, password: string): Promise<boolean>
}

export function useRegister(): RegisterFunction {
    const authApiService = useAuthApiService();
    const jwtStorageService = useJwtStorageService();
    
    const func = useCallback((username: string, email: string, password: string) => (
        register(username, email, password, {
            authApiService,
            jwtStorageService
        })
    ), [])

    return func;
}