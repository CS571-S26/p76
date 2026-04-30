import { createContext, useEffect, useState } from 'react';

export const ReviewUsername = createContext("");

export function ReviewUsernameProvider({ children }) {
    const [username, setUser] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("username");
        if (saved) setUser(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("username", username);
    }, [username]);


    return (
        <ReviewUsername.Provider value={{ username, setUser }}>
            {children}
        </ReviewUsername.Provider>
    );
}