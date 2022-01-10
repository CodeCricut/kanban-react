import { getCurrentDateTimeString } from "../../library/dates";
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

    const jwt = await createUserJwt(user.id, command.password);
    return jwt;
}
