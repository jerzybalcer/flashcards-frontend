export interface User {
    id: number;
    email: string;
    accessToken: string;
    username: string | null;
    profilePictureUrl: string | null;
    nativeLanguageId: string | null;
    hasCompletedOnboarding: boolean;
}