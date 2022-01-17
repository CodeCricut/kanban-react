import { IJwtStorageService } from "../contracts/jwtStorageService";

type Dependencies = {
    jwtStorageService: IJwtStorageService
}

export function logOut({jwtStorageService}: Dependencies){
    jwtStorageService.removeJwt()
}