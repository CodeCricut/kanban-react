import { useCallback, useEffect, useState } from "react";
import { Project } from "../../domain/project";
import { useJwtStorageService } from "../../services/jwtStorage/hook";
import { useProjectsStorage } from "../../services/projectsStorage";
import { useUserApiService } from "../../services/userApi/hook";
import { getUsersProjects } from "./getIsersProjects";

type GetUsersProjectsFunction = {
    (): Promise<Project[] | undefined>;
};
export function useGetUsersProjects(): GetUsersProjectsFunction {
    const usersApiService = useUserApiService();

    const func = useCallback(
        () =>
            getUsersProjects({
                usersApiService,
            }),
        [usersApiService]
    );

    return func;
}

export function useUsersProjects(): Project[] {
    const getUsersProjects = useGetUsersProjects();
    const projectStorageService = useProjectsStorage();

    // Reset the local project state whenever getUsersProjects changes, such as when the jwt is changed
    useEffect(() => {
        getUsersProjects().then((loaded) =>
            projectStorageService.updateProjects(loaded ?? [])
        );
    }, [getUsersProjects]);

    return projectStorageService.projects;
}
