import * as jwt from "jsonwebtoken";
export function createUserJwt(userId: string, userPassword: string): string {
    const payload = {
        user: {
            id: userId,
        },
    };

    const jwtOpts = {};
    return jwt.sign(payload, getPrivateJwtKey(), jwtOpts);
}

function getPrivateJwtKey() {
    const privateKey = process.env.PRIVATE_JWT_KEY;
    if (!privateKey) {
        throw new Error(
            "Tried generating a JWT without setting the PRIVATE_JWT_KEY environment variable."
        );
    }
    return privateKey;
}
