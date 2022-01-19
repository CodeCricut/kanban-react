import { PrivateUser } from "../../domain/privateUser";
import { Project } from "../../domain/project";

export interface IUserApiService {
    getMe(): Promise<PrivateUser|undefined>
    getMyProjects(): Promise<Project[]|undefined>
}