import { createContext, useContext, useEffect, useState, useMemo } from "react";

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 < Date.now();
        }
        catch (e) {
            return true;
        }
    };

    const isAuthenticated = useMemo(() =>
        !!token && !isTokenExpired(token),
        [token]);

    useEffect(() => {
        try {
            if (isTokenExpired(token)) {
                logout();
            }
        }
        catch (e) {
            console.error("Token check failed:", e);
            logout();
        }
        finally {
            setLoading(false);
        }
    }, [token]);


    const value = useMemo(() =>
        ({ token, login, logout, loading, isAuthenticated }),
        [token, isAuthenticated, loading]);

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};