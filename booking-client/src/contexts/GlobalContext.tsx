'use client';

import { createContext } from "react";

const GlobalContext = createContext({
    toastProps: {
        open: false,
        message: "",
        severity: "info" as "success" | "info" | "warning" | "error",
        setProps: () => {}
    },
    setToastProps: (props: any) => {},
});

export default GlobalContext;