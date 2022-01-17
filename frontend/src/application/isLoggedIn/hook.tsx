import { useMemo } from "react";
import { useJwtStorageService } from "../../services/jwtStorage/hook";

export function useIsLoggedIn(): boolean {
    const jwtService = useJwtStorageService();
    const loggedIn = useMemo(() => !!jwtService.jwt, [jwtService])
    return loggedIn
}