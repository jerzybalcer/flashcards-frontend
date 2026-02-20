import { User } from "@/model/User";

export const getCurrentUser = (): User | null => {
    const storedUser = localStorage.getItem('user');

    return storedUser ? JSON.parse(storedUser) as User : null;
}