import { ProjectsApiService } from "./service";
import { IProjectsApiService } from "../../application/contracts/projectsApiService";
import { useJwtStorageService } from "../jwtStorage/hook";
import { useMemo } from "react";


export function useProjectsApiService(): IProjectsApiService {
    const jwtService = useJwtStorageService();
    const service = useMemo(() => new ProjectsApiService(jwtService), [jwtService])
    return service;
}
