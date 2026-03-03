import { Language } from "./Language";

export interface UserOwnProfile {
    accountId: number;
    username: string | null;
    profilePictureUrl: string | null;
    nativeLanguage: Language | null;
    hasCompletedOnboarding: boolean;
}