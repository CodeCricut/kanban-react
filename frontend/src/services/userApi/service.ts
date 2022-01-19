import axios from "axios";
import { IJwtStorageService } from "../../application/contracts/jwtStorageService";
import { IUserApiService } from "../../application/contracts/userApiService";
import { appConfig } from "../../config";
import { PrivateUser } from "../../domain/privateUser";
import { Project } from "../../domain/project";

export class UserApiService implements IUserApiService {
    constructor(private jwtService: IJwtStorageService) {}

    getAuthorizedHeaders() {
        const jwt = this.jwtService.jwt;
        if (!jwt)
            throw new Error(
                `Tried to make authorized request without jwt set.`
            );
        return {
            token: jwt,
        };
    }

    getMe = async (): Promise<PrivateUser | undefined> => {
        try {
            const { data: user } = await axios.get(appConfig.getMeRoute, {
                headers: this.getAuthorizedHeaders(),
            });
            return user;
        } catch (e: any) {
            return undefined;
        }
    };

    getMyProjects = async (): Promise<Project[] | undefined> => {
        try {
            const { data: projects } = await axios.get(
                appConfig.getMyProjectsRoute,
                {
                    headers: this.getAuthorizedHeaders(),
                }
            );
            return projects;
        } catch (e: any) {
            return undefined;
        }
    };
}
