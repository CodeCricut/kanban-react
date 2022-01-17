import { Project } from "../../domain/project";

export interface IJwtStorageService {
    jwt: string|null;
    setJwt: (jwt: string) => void;
    removeJwt: () => void;
}
