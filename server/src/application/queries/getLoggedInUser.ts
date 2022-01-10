import { readPrivateUser } from "../../persistence/user/UserRepository";
import { GetPrivateUserDto } from "../contracts/user";

type GetLoggedInUserQuery = {
    user: {
        id: string;
    };
};
export async function handleGetLoggedInUserHandler(
    query: GetLoggedInUserQuery
): Promise<GetPrivateUserDto> {
    return await readPrivateUser(query.user.id);
}
