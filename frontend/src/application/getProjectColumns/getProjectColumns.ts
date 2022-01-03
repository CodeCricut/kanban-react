import { Column } from "../../domain/column";
import { IProjectsApiService } from "../contracts/projectsApiService";

export type Dependencies = {
    projectsApiService: IProjectsApiService;
};

export async function getProjectColumns(
    projectId: string,
    { projectsApiService }: Dependencies
): Promise<Column[]> {
    return await projectsApiService.getProjectColumns(projectId);
}
