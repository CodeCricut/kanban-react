import { getCurrentDateTimeString } from "../../library/dates";
import { createUserJwt } from "../../services/jwt";
import { GetPublicUserDto, RegisterUserDto } from "../contracts/user";

type RegisterUserCommand = {
    username: string;
    email: string;
    password: string;
};

export async function handleRegisterUserCommand(command: RegisterUserCommand) {
    const currDtStr = getCurrentDateTimeString();
    const registerUserDto: RegisterUserDto = {
        ...command,
        createdAt: currDtStr,
    };
    const user: GetPublicUserDto = await registerUser(registerUserDto);

    return createUserJwt(user.id, command.password);
}
