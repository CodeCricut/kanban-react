import { Project } from "../../domain/project";
import { useProjectsApiService } from "../../services/projectsApi/hook";
import { getAllProjects } from "./getAllProjects";

type GetAllProjectsFunction = {
    (): Promise<Project[]>;
};
export function useGetAllProjects(): GetAllProjectsFunction {
    const projectsApiService = useProjectsApiService();
    return () => getAllProjects({ projectsApiService });
}
