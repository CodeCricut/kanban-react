export type PrivateUser = {
    id?: string;
    username?: string;
    email?: string;
    createdAt?: string;
    /** An ordered array containing the project ids this user owns. */
    projects?: string[]
}