import React, { useState } from "react";
import { User } from "../../model/User";
import { useNavigate } from "react-router-dom";
import { loginUser, loginUserWithGoogle } from "../services/AccountService";
import { errorToast } from "../utils/toasts";


interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    loginWithGoogle: (googleToken: string) => void;
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
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    };

    const loginWithGoogle = async (googleToken: string) => {
        const user = await loginUserWithGoogle(googleToken);
        if(!user) {
            errorToast('Login failed!');
            return;
        }
        setCurrentUser(user);
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return <AuthContext.Provider value={{currentUser, login, logout, loginWithGoogle}}>
        {children}
    </AuthContext.Provider>;
}