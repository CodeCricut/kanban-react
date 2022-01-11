import { getUserById } from "../../persistence/repository/UserRepository";
import { GetPrivateUserDto } from "../contracts/user";

type GetLoggedInUserQuery = {
    id: string;
};
export async function handleGetLoggedInUserQuery(
    query: GetLoggedInUserQuery
): Promise<GetPrivateUserDto> {
    return await getUserById(query.id);
}
