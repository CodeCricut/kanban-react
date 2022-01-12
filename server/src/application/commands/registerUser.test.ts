import * as userRepository from "../../persistence/repository/UserRepository";
import * as jwt from "../../services/jwt";
import * as bcrypt from "../../services/bcrypt";
import * as dates from "../../library/dates";

import { createUserFixture } from "../../test-helpers/userFixtures";
import { handleLoginCommand } from "./login";
import { User } from "../../domain/user";
import {
    EmailTakenError,
    InvalidCredentialsError,
    InvalidEmailError,
    InvalidPasswordError,
    InvalidUsernameError,
    UsernameTakenError,
} from "../errors";
import { dateStringFixture } from "../../test-helpers/dateFixtures";
import { handleRegisterUserCommand } from "./registerUser";

// =================== Test setup ===================
const currTimeFixture = dateStringFixture;
let userFixture: User;
const jwtFixture = "my.json.web.token";

const currDateTimeSpy = jest
    .spyOn(dates, "getCurrentDateTimeString")
    .mockReturnValue(currTimeFixture);
const getUserByUsernameSpy = jest.spyOn(userRepository, "getUserByUsername");
const getUserByEmailSpy = jest.spyOn(userRepository, "getUserByEmail");
const registerUserSpy = jest.spyOn(userRepository, "registerUser");
const createUserJwtSpy = jest.spyOn(jwt, "createUserJwt");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");

    getUserByUsernameSpy.mockResolvedValue(null);
    getUserByEmailSpy.mockResolvedValue(null);
    registerUserSpy.mockResolvedValue(userFixture);
    createUserJwtSpy.mockReturnValue(jwtFixture);
});

// =================== Test cases ===================
test("should throw if invalid username", async () => {
    // Empty username is invalid
    const username = "";

    // Act
    await expect(async () => {
        await handleRegisterUserCommand({
            username,
            email: userFixture.email,
            password: userFixture.passwordHash,
        });
    }).rejects.toThrow(InvalidUsernameError);
});

test("should throw if invalid email", async () => {
    const email = "invalidemail@";

    // Act
    await expect(async () => {
        await handleRegisterUserCommand({
            username: userFixture.username,
            email,
            password: userFixture.passwordHash,
        });
    }).rejects.toThrow(InvalidEmailError);
});

test("should throw if invalid password", async () => {
    // Passwords must be >= 6 chars
    const password = "12345";

    // Act
    await expect(async () => {
        await handleRegisterUserCommand({
            username: userFixture.username,
            email: userFixture.email,
            password,
        });
    }).rejects.toThrow(InvalidPasswordError);
});

test("should throw if username taken", async () => {
    // Username taken
    getUserByUsernameSpy.mockResolvedValue(userFixture);

    // Act
    await expect(async () => {
        await handleRegisterUserCommand({
            username: userFixture.username,
            email: userFixture.email,
            password: userFixture.passwordHash,
        });
    }).rejects.toThrow(UsernameTakenError);
});

test("should throw if email taken", async () => {
    // Email taken
    getUserByEmailSpy.mockResolvedValue(userFixture);

    // Act
    await expect(async () => {
        await handleRegisterUserCommand({
            username: userFixture.username,
            email: userFixture.email,
            password: userFixture.passwordHash,
        });
    }).rejects.toThrow(EmailTakenError);
});

test("should register user", async () => {
    const command = {
        username: userFixture.username,
        email: userFixture.email,
        password: userFixture.passwordHash,
    };

    // Act
    await handleRegisterUserCommand(command);

    expect(registerUserSpy).toHaveBeenCalledWith({
        ...command,
        createdAt: dateStringFixture,
    });
});

test("should return jwt for user", async () => {
    const expected = jwtFixture;

    // Act
    const actual = await handleRegisterUserCommand({
        username: userFixture.username,
        email: userFixture.email,
        password: userFixture.passwordHash,
    });

    expect(actual).toEqual(expected);
});
