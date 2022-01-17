import { IAuthApiService } from "../contracts/authApiService";
import { IJwtStorageService } from "../contracts/jwtStorageService";

type Dependencies = {
    authApiService: IAuthApiService;
    jwtStorageService: IJwtStorageService;
}

/**
 * @returns Successful
 */
export async function login(username: string, password: string, dependencies: Dependencies): Promise<boolean>{
    const {authApiService, jwtStorageService} = dependencies;
    
    // Login
    const jwt = await authApiService.login(username, password);
    if (!jwt) return false;

    jwtStorageService.setJwt(jwt);
    return true;
}