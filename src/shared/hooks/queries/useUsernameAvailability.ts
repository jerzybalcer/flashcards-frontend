import { getUsersByUsername } from "@/shared/services/UserService";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

export const useUsernameAvailability = (username: string) => {
    const currentUser = getCurrentUser();
    const [debouncedUsername, setDebouncedUsername] = useDebounceValue<string>(username, 400);
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setDebouncedUsername(username);
    }, [username]);

    useEffect(() => {
        if (!username) {
            setIsAvailable(false);
            return;
        }

        if(username === currentUser?.username){
            setIsAvailable(true);
            return;
        }
        
        setIsLoading(true);
        getUsersByUsername(username, true)
            .then((users) => {
                setIsAvailable(users.length === 0 || users[0].id === currentUser!.id);
                })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [debouncedUsername]);

    return { username, isAvailable, isLoading };
}