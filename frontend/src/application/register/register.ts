import { IAuthApiService } from "../contracts/authApiService";
import { IJwtStorageService,  } from "../contracts/jwtStorageService";

type Dependencies = {
    authApiService: IAuthApiService;
    jwtStorageService: IJwtStorageService;
}

/**
 * @returns Successful
 */
export async function register(name: string, email: string, password: string, dependencies: Dependencies): Promise<boolean> {
    const {authApiService, jwtStorageService} = dependencies;

    // Register user
    const jwt = await authApiService.registerUser(name, email, password)
    if (!jwt) return false;

    jwtStorageService.setJwt(jwt)
    return true;
}