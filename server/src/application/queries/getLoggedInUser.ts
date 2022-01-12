import { getUserById } from "../../persistence/repository/UserRepository";
import { GetPrivateUserDto, mapToPrivateUserDto } from "../contracts/user";
import { InvalidBackingStateError } from "../errors";

type GetLoggedInUserQuery = {
    id: string;
};
export async function handleGetLoggedInUserQuery(
    query: GetLoggedInUserQuery
): Promise<GetPrivateUserDto> {
    const user = await getUserById(query.id);
    if (!user)
        throw new InvalidBackingStateError(
            "Tried to get a logged in user using an id of a user which does not exist."
        );

    return mapToPrivateUserDto(user);
}
