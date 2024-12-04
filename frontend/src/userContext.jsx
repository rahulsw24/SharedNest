import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext(null);

// Provide the context to the entire app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get("/api/users/get-user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for accessing the context
export const useUser = () => useContext(UserContext);
