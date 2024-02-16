export type BearerTokenPayload = {
    access_token: string,
    token_type: "bearer"
}

export type User = {
    id: number,
    username: string
}