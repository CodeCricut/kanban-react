import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import { IJwtStorageService } from "../../application/contracts/jwtStorageService";

export function useJwtStorageService(): IJwtStorageService {
    const [cookies, setCookie] = useCookies(['jwt'])

    const jwt = useMemo(() => cookies.jwt, [cookies])
    const setJwt = useCallback((jwt?: string) => setCookie('jwt', jwt), [setCookie])

    const service = useMemo(() => ({
        jwt,
        setJwt,
        removeJwt: () => setJwt()
    }), [jwt, setJwt])

    return service
}