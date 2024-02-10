'use client'

import { useEffect } from "react";

export const useWindowClickOnce = (
    callback: () => void,
    deps: any[],
    predicate?: () => boolean
) => {
    useEffect(() => {
        if (predicate === undefined || predicate() === true) {
            window.addEventListener("click", () =>  {
                callback()
                window.removeEventListener("click", callback)
            });
            return () => window.removeEventListener("click", callback);
        }
    }, deps);
};
