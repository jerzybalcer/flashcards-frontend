import { Language } from "./Language";

export interface UserProfile {
    accountId: number;
    username: string;
    profilePictureUrl: string | null;
    nativeLanguage: Language;
}