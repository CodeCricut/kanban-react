import * as validator from "validator";
import * as UserRepository from "../../persistence/repository/UserRepository";
import * as jwt from "../../services/jwt";
import { RegisterUserDto } from "../contracts/user";
import { handleRegisterUserCommand } from "./registerUser";
import { getCurrentDateTimeString } from "../../library/dates";
import { createValidGetPublicUserDto } from "../../test-helpers/userFixtures";

test("should throw if username empty", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    const command: RegisterUserDto = {
        username: "",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "validpwd123",
    };
    await expect(async () => {
        await handleRegisterUserCommand(command);
    }).rejects.toThrow(Error);
});

test("should throw if email invalid format", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "invalidemail@",
        createdAt: getCurrentDateTimeString(),
        password: "validpwd123",
    };
    await expect(async () => {
        await handleRegisterUserCommand(command);
    }).rejects.toThrow(Error);
});

test("should throw if password less than 6 characters", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "pwd1",
    };
    await expect(async () => {
        await handleRegisterUserCommand(command);
    }).rejects.toThrow(Error);
});

test("should throw if username taken", async () => {
    // Username should be taken
    const existingUserWithUsername = createValidGetPublicUserDto();
    jest.spyOn(UserRepository, "getUserByUsername").mockResolvedValueOnce(
        existingUserWithUsername
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "validpwd",
    };
    await expect(async () => {
        await handleRegisterUserCommand(command);
    }).rejects.toThrow(Error);
});

test("should throw if email taken", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should be taken
    const existingUserWithEmail = createValidGetPublicUserDto();
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValueOnce(
        existingUserWithEmail
    );

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "validpwd",
    };
    await expect(async () => {
        await handleRegisterUserCommand(command);
    }).rejects.toThrow(Error);
});

test("should register user", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    // Spy on register function
    const registeredUser = createValidGetPublicUserDto();
    const registerUserSpy = jest
        .spyOn(UserRepository, "registerUser")
        .mockResolvedValueOnce(registeredUser);

    // Spy on jwt creation
    const expectedJwt = "RETURNED.JWT";
    jest.spyOn(jwt, "createUserJwt").mockReturnValueOnce(expectedJwt);

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "validpassword",
    };

    // Act
    await handleRegisterUserCommand(command);

    // Expect register function called
    expect(registerUserSpy).toHaveBeenCalled();
});

test("should return jwt for user", async () => {
    // Username should not be taken
    jest.spyOn(UserRepository, "getUserByUsername").mockRejectedValue(
        new Error()
    );
    // Email should not be taken
    jest.spyOn(UserRepository, "getUserByEmail").mockRejectedValue(new Error());

    // Spy on register function
    jest.spyOn(UserRepository, "registerUser").mockResolvedValueOnce(
        createValidGetPublicUserDto()
    );

    // Spy on jwt creation
    const expectedJwt = "RETURNED.JWT";
    jest.spyOn(jwt, "createUserJwt").mockReturnValueOnce(expectedJwt);

    const command: RegisterUserDto = {
        username: "valid_username",
        email: "validEmail@email.com",
        createdAt: getCurrentDateTimeString(),
        password: "validpassword",
    };

    // Act
    const returnedJwt = await handleRegisterUserCommand(command);

    // Expect jwt returned
    expect(returnedJwt).toEqual(expectedJwt);
});
