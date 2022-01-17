import { Column } from "../../domain/column";
import { Issue } from "../../domain/issue";

export interface IAuthApiService {
    /**
     * Register a new user and return the JWT for the user, or null if not successful
     */
    registerUser(username: string, email: string, password: string): Promise<string|null>

    /**
     * Login a user and return the JWT for the user, or null if not successful
     */
    login(username: string, password: string): Promise<string|undefined>
}
