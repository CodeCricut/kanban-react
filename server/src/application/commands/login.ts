import { getPrivateUserByUsername } from "../../persistence/repository/UserRepository";
import { isCorrectPassword } from "../../services/bcrypt";
import { createUserJwt } from "../../services/jwt";
import { GetPrivateUserDto, LoginUserDto } from "../contracts/user";

type LoginCommand = LoginUserDto;

/**
 * @returns The jwt of the logged in user
 */
export async function handleLoginCommand(
    command: LoginCommand
): Promise<string> {
    const loginDto: LoginUserDto = command;
    const privateUser: GetPrivateUserDto = await getPrivateUserByUsername(
        loginDto
    );

    const passwordsMatch = await isCorrectPassword(
        loginDto.password,
        privateUser.passwordHash
    );
    if (!passwordsMatch) throw new Error("Incorrect password.");

    return createUserJwt(privateUser.id, command.password);
}
