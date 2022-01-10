import validator from "validator";
import { getCurrentDateTimeString } from "../../library/dates";
import {
    getUserByEmail,
    getUserByUsername,
    registerUser,
} from "../../persistence/user/UserRepository";
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
    validateFields(registerUserDto);
    if (await isUsernameTaken(registerUserDto.username))
        throw new Error(`Username '${registerUserDto.username}' taken.`);
    if (await isEmailTaken(registerUserDto.email))
        throw new Error(`Email '${registerUserDto.email}' taken.`);

    const user: GetPublicUserDto = await registerUser(registerUserDto);

    return createUserJwt(user.id, command.password);
}

async function isUsernameTaken(username: string): Promise<boolean> {
    try {
        await getUserByUsername(username);
        return true;
    } catch (e: any) {
        // Not found
        return false;
    }
}

async function isEmailTaken(email: string): Promise<boolean> {
    try {
        await getUserByEmail(email);
        return true;
    } catch (e: any) {
        // Not found
        return false;
    }
}

function validateFields(dto: RegisterUserDto) {
    const { username, email, password } = dto;
    if (validator.isEmpty(username))
        throw new Error("Username must not be empty");
    if (!validator.isEmail(email)) throw new Error("Invalid email address.");
    if (!validator.isLength(password, { min: 6 }))
        throw new Error("Password must be at least 6 characters long.");
}
