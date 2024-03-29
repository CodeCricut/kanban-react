import * as bcrypt from "bcryptjs";

export async function hashUserPassword(
    plainTextPassword: string,
    saltLevel: number = 10
): Promise<string> {
    const salt = await bcrypt.genSalt(saltLevel);
    return await bcrypt.hash(plainTextPassword, salt);
}

export async function isCorrectPassword(
    plainTextPassword: string,
    expectedPasswordHash: string
): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, expectedPasswordHash);
}
