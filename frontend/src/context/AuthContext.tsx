import React, {createContext, useState, useEffect, ReactNode} from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    role_id: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
