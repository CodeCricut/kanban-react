import { IProjectsApiService } from "../../application/contracts/projectsApiService";
import { Project } from "../../domain/project";

export const projectsApiService: IProjectsApiService = {
    createProject: (project: Project) => {
        // TODO: call actual projects api
        return Promise.resolve({
            ...project,
            id: "test id",
        });
    },
};
