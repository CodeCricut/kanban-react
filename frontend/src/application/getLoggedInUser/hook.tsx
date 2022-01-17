import { useEffect, useState } from "react";
import { PrivateUser } from "../../domain/privateUser";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { useUserApiService } from "../../services/userApi/hook";
import { getLoggedInUser } from "./getLoggedInUser";

export function useLoggedInUser(): PrivateUser|undefined {
    const jwtStorageService = useJwtStorageService();
    const userApiService = useUserApiService();

    const [user, setUser] = useState<PrivateUser|undefined>()

    useEffect(() => {
        getLoggedInUser({jwtStorageService, userApiService}).then(loaded => setUser(loaded))
    }, [jwtStorageService, userApiService])
    
    return  user
}