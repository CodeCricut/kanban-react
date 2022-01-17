import { PrivateUser } from "../../domain/privateUser";
import { Project } from "../../domain/project";

export interface IUserApiService {
    getMe(jwt: string): Promise<PrivateUser|undefined>
    getMyProjects(jwt: string): Promise<Project[]|undefined>
}