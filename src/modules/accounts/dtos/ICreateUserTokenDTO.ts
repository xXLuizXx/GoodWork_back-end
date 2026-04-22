interface ICreateUserTokenDTO {
    userId: string;
    expiresDate: Date;
    refreshToken: string;
    type?: "refresh_token" | "password_reset" | "email_verification";
}

export { ICreateUserTokenDTO };