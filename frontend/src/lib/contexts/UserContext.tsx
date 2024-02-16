"use client";

import { ReactNode, createContext, useContext } from "react";
import { User } from "../tokens/tokens.types";
import { useGetUserQuery } from "../redux/posts/postsApi";
import { getUserFromJwt } from "../tokens/tokens";

export const UserContext = createContext<null | User>(null);

export const useUserContext = () => {
    const user = useContext(UserContext);
    if (user === undefined)
        throw new Error(
            "useUserContext() can only be used within the scope of <UserContextProvider />"
        );
    return user;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const user = getUserFromJwt();
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
