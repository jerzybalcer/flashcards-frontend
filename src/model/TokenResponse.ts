import { UserOwnProfile } from "./UserOwnProfile";

export interface TokenResponse {
    accessToken: string;
    user: UserOwnProfile;
}