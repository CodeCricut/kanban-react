import { getCurrentDateTimeString } from "../../library/dates";
import { RegisterUserDto } from "../contracts/user";

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
}
