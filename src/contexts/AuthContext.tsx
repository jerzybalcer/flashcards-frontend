import React, { useState } from "react";
import { User } from "../model/User";
import { useNavigate } from "react-router-dom";

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
        email = password; // temp: satisfy eslint & ts errors
        // const user = await loginUser(email, password);
        const user = { email: 'rafalsmykala@gmai.com', name: 'r_smykalka', id: 1 };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    }

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>;
}