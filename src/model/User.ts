import { Language } from "./Language";

export interface User {
    id: number;
    username: string;
    profilePictureUrl: string;
    nativeLanguage: Language;
}