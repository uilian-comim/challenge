"use client";

import { Children } from "@/interfaces/children";
import { createContext, useContext, useMemo, useState } from "react";

interface ModalContext {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContext>({} as ModalContext);

export function ModalProvider({ children }: Children) {
    const [isOpen, setIsOpen] = useState(false);

    const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}

export const useModal = (): ModalContext => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within an ModalProvider");
    }

    return context;
};
