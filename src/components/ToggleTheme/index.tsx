"use client";
import { useCallback, useState } from "react";
import { Toggle } from "../ui/toggle";
import { Sun, Moon } from "lucide-react";

export function ToggleTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const toggleTheme = useCallback(() => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            setTheme("light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            setTheme("dark");
        }
    }, []);
    return (
        <Toggle
            className="absolute top-5 right-5 text-gray-600"
            onClick={toggleTheme}
        >
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </Toggle>
    );
}
