import * as jwt from "jsonwebtoken";

export type JwtUser = {
    id: string;
};

export function createUserJwt(userId: string, userPassword: string): string {
    const payload: { user: JwtUser } = {
        user: {
            id: userId,
        },
    };

    const jwtOpts = {};
    return jwt.sign(payload, getPrivateJwtKey(), jwtOpts);
}

export function decodeUserJwt(token: string): JwtUser {
    const decoded: any = jwt.verify(token, getPrivateJwtKey());
    return decoded.user as JwtUser;
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
