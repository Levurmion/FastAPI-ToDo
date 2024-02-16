import { User } from "./tokens.types";
import { BearerTokenPayload } from "./tokens.types";

export const isBearerToken = (token: BearerTokenPayload): token is BearerTokenPayload => {
    if (token?.token_type.toLowerCase() === "bearer" && typeof token.access_token === "string") {
        return true;
    }
    return false;
};

export const setBearerToken = (token: any) => {
    if (!isBearerToken(token)) return;
    sessionStorage.setItem("access_token", token.access_token);
};

export const getBearerToken = () => {
    return sessionStorage.getItem("access_token");
};

export const createBearerToken = () => {
    return `Bearer ${getBearerToken()}`;
};

export const removeBearerToken = () => {
    sessionStorage.removeItem("access_token");
};

export const getUserFromJwt = () => {
    const token = getBearerToken();
    if (token === null) return null;
    const base64payload = token?.split(".")[1].replace("-", "+").replace("_", "/");
    const payload = JSON.parse(atob(base64payload))
    return {
        id: payload.id,
        username: payload.username
    } as User
};
