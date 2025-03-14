import React, { useState } from "react";
import { User } from "../model/User";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../hooks/general/useApiClient";
import { AxiosError } from "axios";
import humps from "humps";
import { AuthResponse } from "../model/AuthResponse";

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
    const { apiClient, setAccessToken } = useApiClient();

    const getUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');

        return storedUser ? JSON.parse(storedUser) : null;
    }

    const [currentUser, setCurrentUser] = useState<User | null>(getUserFromStorage());
    const navigate = useNavigate();

    const callLoginEndpoint = async (email: string, password: string): Promise<AuthResponse> =>
        apiClient
            .post(`/login`, 
                { email: email, password: password }, 
                { headers: {'Content-Type': 'application/json'} })
            .then(res => humps.camelizeKeys(res.data) as AuthResponse)
            .catch((err: AxiosError) => Promise.reject(err));

    const callRegisterEndpoint = async (name: string, email: string, password: string) =>
        apiClient
            .post(`/register`, 
                { name: name, email: email, password: password }, 
                { headers: {'Content-Type': 'application/json'} })
            .then(res => res.data)
            .catch((err: AxiosError) => Promise.reject(err));

    const callRefreshEndpoint = async (): Promise<AuthResponse> =>
        apiClient
            .post(`/refresh_token`, 
                { headers: {'Content-Type': 'application/json'}, credentials: 'include' })
            .then(res => humps.camelizeKeys(res.data) as AuthResponse)
            .catch((err: AxiosError) => Promise.reject(err));

    const callLogoutEndpoint = async (): Promise<AuthResponse> =>
        apiClient
            .post(`/logout`, 
                { headers: {'Content-Type': 'application/json'}, credentials: 'include' })
            .then(res => res.data)
            .catch((err: AxiosError) => Promise.reject(err));
            

    const login = async (email: string, password: string) => {
        const loginResponse = await callLoginEndpoint(email, password);
        console.log(loginResponse)
        const user = { email: email, name: 'username', accessToken: loginResponse.accessToken} as User;
        setCurrentUser(user);
        setAccessToken(loginResponse.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    };

    const refreshTokens = async () => {
        const refreshResponse = await callRefreshEndpoint();

        if(refreshResponse.accessToken){
            const user = { ...currentUser, accessToken: refreshResponse.accessToken} as User;
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    const logout = async () => {
        await callLogoutEndpoint();
        setCurrentUser(null);
        setAccessToken('');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>;
}