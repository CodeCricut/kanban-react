import validator from "validator";
import { getCurrentDateTimeString } from "../../library/dates";
import {
    getUserByEmail,
    getUserByUsername,
    registerUser,
} from "../../persistence/repository/UserRepository";
import { createUserJwt } from "../../services/jwt";
import { GetPublicUserDto, RegisterUserDto } from "../contracts/user";
import {
    EmailTakenError,
    InvalidEmailError,
    InvalidPasswordError,
    InvalidUsernameError,
    UsernameTakenError,
} from "../errors";

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
        throw new UsernameTakenError(
            `Username '${registerUserDto.username}' taken.`
        );
    if (await isEmailTaken(registerUserDto.email))
        throw new EmailTakenError(`Email '${registerUserDto.email}' taken.`);

    const user: GetPublicUserDto = await registerUser(registerUserDto);

    return createUserJwt(user.id, command.password);
}

async function isUsernameTaken(username: string): Promise<boolean> {
    const user = await getUserByUsername(username);
    return user != null;
}

async function isEmailTaken(email: string): Promise<boolean> {
    const user = await getUserByEmail(email);
    return user != null;
}

function validateFields(dto: RegisterUserDto) {
    const { username, email, password } = dto;
    if (validator.isEmpty(username))
        throw new InvalidUsernameError("Username must not be empty");
    if (!validator.isEmail(email))
        throw new InvalidEmailError("Invalid email address.");
    if (!validator.isLength(password, { min: 6 }))
        throw new InvalidPasswordError(
            "Password must be at least 6 characters long."
        );
}
