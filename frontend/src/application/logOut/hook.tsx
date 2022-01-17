import { useCallback } from "react";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { logOut } from "./logOut";

type LogOutFunction = {
    (): void
}
export function useLogOut(): LogOutFunction{
    const jwtStorageService = useJwtStorageService()
    const func = useCallback(() => logOut({jwtStorageService}), [jwtStorageService])
    return func;
}