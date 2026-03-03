import { useMemo } from "react";
import { useUsernameAvailability } from "../../../shared/hooks/queries/useUsernameAvailability";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

const validateUsernameFormat = (username: string): string | null => {
    if (!username) return "Username is required";
    if (!USERNAME_REGEX.test(username)) return "Username can only contain letters, numbers and underscores";
    return null;
};

export const useUsernameValidation = (username: string) => {
    const formatError = useMemo(() => validateUsernameFormat(username), [username]);

    const { isAvailable, isLoading: isAvailabilityLoading } = useUsernameAvailability(
        formatError ? '' : username
    );

    const error = useMemo(() => {
        if (formatError) return formatError;
        if (isAvailabilityLoading) return null;
        if (!isAvailable) return "Username is taken";
        return null;
    }, [formatError, isAvailable, isAvailabilityLoading]);

    return {
        error,
        isLoading: isAvailabilityLoading && !formatError,
    };
};