import { useCallback, useEffect, useState } from "react";
import { PrivateUser } from "../../domain/privateUser";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { useUserApiService } from "../../services/userApi/hook";
import { getLoggedInUser } from "./getLoggedInUser";

type GetLoggedInUserFunction = {
    (): Promise<PrivateUser|undefined>
}
export function useGetLoggedInUser(): GetLoggedInUserFunction {
    const jwtStorageService = useJwtStorageService();
    const userApiService = useUserApiService();

    const func = useCallback(() => getLoggedInUser({jwtStorageService, userApiService}), [jwtStorageService, userApiService])
    return func;
}

export function useLoggedInUser(): PrivateUser|undefined {
    const [user, setUser] = useState<PrivateUser|undefined>()
    
    const getLoggedInUser = useGetLoggedInUser()
    
    useEffect(() => {
        getLoggedInUser().then(loaded => setUser(loaded))
    }, [getLoggedInUser])
    
    return  user
}