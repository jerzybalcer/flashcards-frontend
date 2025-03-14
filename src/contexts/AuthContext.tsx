import React, { useState } from "react";
import { User } from "../model/User";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const getUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');

        return storedUser ? JSON.parse(storedUser) : null;
    }

    const [currentUser, setCurrentUser] = useState<User | null>(getUserFromStorage());
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const user = await loginUser(email, password);
        setCurrentUser(user)
        localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
        navigate('/');
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>;
}