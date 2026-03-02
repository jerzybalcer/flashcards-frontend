import { AccountWithToken } from "@/model/AccountWithToken";

export const getCurrentUser = (): AccountWithToken | null => {
    const storedUser = localStorage.getItem('user');

    return storedUser ? JSON.parse(storedUser) as AccountWithToken : null;
}