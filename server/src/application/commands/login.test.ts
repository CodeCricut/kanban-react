import * as userRepository from "../../persistence/repository/UserRepository";
import * as jwt from "../../services/jwt";
import * as bcrypt from "../../services/bcrypt";

import { createUserFixture } from "../../test-helpers/userFixtures";
import { handleLoginCommand } from "./login";
import { User } from "../../domain/user";
import { InvalidCredentialsError } from "../errors";

// =================== Test setup ===================
let userFixture: User;
let jwtFixture = "my.json.web.token";

const getUserByUsername = jest.spyOn(userRepository, "getUserByUsername");
const isCorrectPasswordSpy = jest.spyOn(bcrypt, "isCorrectPassword");
const createUserJwtSpy = jest.spyOn(jwt, "createUserJwt");

beforeEach(() => {
    userFixture = createUserFixture("pwdhash");
    getUserByUsername.mockResolvedValue(userFixture);
    isCorrectPasswordSpy.mockResolvedValue(true);
    createUserJwtSpy.mockReturnValue(jwtFixture);
});

// =================== Test cases ===================
test("should throw if user not found", async () => {
    // User should not exist
    getUserByUsername.mockResolvedValue(null);

    // Act
    await expect(async () => {
        await handleLoginCommand({
            username: "username",
            password: "password",
        });
    }).rejects.toThrow(InvalidCredentialsError);
});

test("should throw if password invalid", async () => {
    // Password is invalid
    isCorrectPasswordSpy.mockResolvedValue(false);

    // Act
    await expect(async () => {
        await handleLoginCommand({
            username: "username",
            password: "password",
        });
    }).rejects.toThrow(InvalidCredentialsError);
});

test("should return jwt for user", async () => {
    const expected = jwtFixture;
    // Act
    const actual = await handleLoginCommand({
        username: "username",
        password: "password",
    });

    expect(actual).toEqual(expected);
});
