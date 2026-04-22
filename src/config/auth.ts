export default {
    secretToken: process.env.JWT_SECRET as string,
    expiresInToken: "1h",
    secretRefreshToken: process.env.JWT_REFRESH_SECRET as string,
    expiresInRefreshToken: "1d",
    expiresRefreshTokenDays: 15,
};
