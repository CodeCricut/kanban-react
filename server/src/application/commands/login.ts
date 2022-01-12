import { getUserByUsername } from "../../persistence/repository/UserRepository";
import { isCorrectPassword } from "../../services/bcrypt";
import { createUserJwt } from "../../services/jwt";
import { GetPrivateUserDto, LoginUserDto } from "../contracts/user";
import { InvalidCredentialsError } from "../errors";

type LoginCommand = LoginUserDto;

/**
 * @returns The jwt of the logged in user
 */
export async function handleLoginCommand(
    command: LoginCommand
): Promise<string> {
    const loginDto: LoginUserDto = command;
    const user = await getUserByUsername(loginDto.username);
    if (!user) {
        throw new InvalidCredentialsError("Username invalid.");
    }

    const passwordsMatch = await isCorrectPassword(
        loginDto.password,
        user.passwordHash
    );
    if (!passwordsMatch)
        throw new InvalidCredentialsError("Incorrect password.");

    return createUserJwt(user.id, command.password);
}
