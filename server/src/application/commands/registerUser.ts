import { getCurrentDateTimeString } from "../../library/dates";
import { registerUser } from "../../persistence/user/UserRepository";
import { createUserJwt } from "../../services/jwt";
import { GetPublicUserDto, RegisterUserDto } from "../contracts/user";

type RegisterUserCommand = {
    username: string;
    email: string;
    password: string;
};

/**
 * @returns The generated JWT for the new user.
 */
export async function handleRegisterUserCommand(
    command: RegisterUserCommand
): Promise<string> {
    const currDtStr = getCurrentDateTimeString();
    const registerUserDto: RegisterUserDto = {
        ...command,
        createdAt: currDtStr,
    };
    // TODO: ensure user with username or password doesn't already exist
    // TODO: validate fields (username, email, password)
    const user: GetPublicUserDto = await registerUser(registerUserDto);

    return createUserJwt(user.id, command.password);
}
