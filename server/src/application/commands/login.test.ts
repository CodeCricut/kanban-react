import * as UserRepository from "../../persistence/repository/UserRepository";
import * as jwt from "../../services/jwt";
import * as bcrypt from "../../services/bcrypt";

import { createValidGetPrivateUserDto } from "../../test-helpers/userFixtures";
import { handleLoginCommand } from "./login";

test("should throw if user not found", async () => {
    // User should not exist
    jest.spyOn(UserRepository, "readPrivateUser").mockRejectedValue(
        new Error()
    );

    // Spy on pwd validation
    const bcryptSpy = jest
        .spyOn(bcrypt, "isCorrectPassword")
        .mockResolvedValue(true);

    // Spy on jwt creation
    const expectedJwt = "Expected.jwt";
    jest.spyOn(jwt, "createUserJwt").mockReturnValue(expectedJwt);

    await expect(async () => {
        await handleLoginCommand({
            username: "username",
            password: "password",
        });
    }).rejects.toThrow(Error);
});

test("should throw if password invalid", async () => {
    // Mock existing user
    const existingUser = createValidGetPrivateUserDto("PWD_HASH");
    jest.spyOn(UserRepository, "readPrivateUser").mockResolvedValue(
        existingUser
    );

    // Pwd should not be valid
    const bcryptSpy = jest
        .spyOn(bcrypt, "isCorrectPassword")
        .mockResolvedValue(false);

    // Spy on jwt creation
    const expectedJwt = "Expected.jwt";
    jest.spyOn(jwt, "createUserJwt").mockReturnValue(expectedJwt);

    await expect(async () => {
        await handleLoginCommand({
            username: "username",
            password: "password",
        });
    }).rejects.toThrow(Error);
});

test("should return jwt for user", async () => {
    // Mock existing user
    const existingUser = createValidGetPrivateUserDto("PWD_HASH");
    jest.spyOn(UserRepository, "readPrivateUser").mockResolvedValue(
        existingUser
    );

    // Spy on pwd validation
    const bcryptSpy = jest
        .spyOn(bcrypt, "isCorrectPassword")
        .mockResolvedValue(true);

    // Spy on jwt creation
    const expectedJwt = "Expected.jwt";
    jest.spyOn(jwt, "createUserJwt").mockReturnValue(expectedJwt);

    // Act
    const actualJwt = await handleLoginCommand({
        username: "username",
        password: "password",
    });

    // Expect pwd to be validated
    expect(bcryptSpy).toHaveBeenCalled();

    // Expect jwt returned
    expect(actualJwt).toEqual(expectedJwt);
});
