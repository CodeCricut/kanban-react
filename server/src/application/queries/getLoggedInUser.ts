import { readPrivateUser } from "../../persistence/user/UserRepository";
import { GetPrivateUserDto } from "../contracts/user";

type GetLoggedInUserQuery = {
    id: string;
};
export async function handleGetLoggedInUserQuery(
    query: GetLoggedInUserQuery
): Promise<GetPrivateUserDto> {
    return await readPrivateUser(query.id);
}
