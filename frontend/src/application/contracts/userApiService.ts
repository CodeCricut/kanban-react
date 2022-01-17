import { PrivateUser } from "../../domain/privateUser";

export interface IUserApiService {
    getMe(jwt: string): Promise<PrivateUser|undefined>
}