import { SignJWT, jwtVerify } from "jose"

//Gerador de JWTs
export async function generateJWT(payload, secret, duration) {
    const iat = Math.floor(Date.now() / 1000)
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(iat + duration)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
}

//Verificador de JWTs
export async function verifyJWT(jwt, secret) {
    return jwtVerify(jwt, new TextEncoder().encode(secret), { algorithms: ["HS256"] })
}

export const cookieOptions = {
    secure: process.env.COOKIE_SECURE ? "Secure" : "",
    maxAge: parseInt(process.env.COOKIE_DURATION),
    sameSite: process.env.COOKIE_SAME_SITE,
    path: process.env.COOKIE_PATH,
    httpOnly: true
}
