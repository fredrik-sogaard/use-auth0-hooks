import { ITokenResponse } from "../context/access-token-context";
import { RedirectLoginOptions, PopupLoginOptions, PopupConfigOptions, AccessTokenRequestOptions, LogoutOptions } from "../context/auth0-context";
export interface UseAuthResult {
    /**
     * The current user.
     */
    user: any;
    /**
     * The access token.
     */
    accessToken?: string | null;
    /**
     * The token.
     */
    token?: ITokenResponse | null;
    /**
     * If the transaction failed, this will contain the error.
     */
    error: Error | null;
    /**
     * Is the transaction still ongoing.
     */
    isLoading: boolean;
    /**
     * Is the user authenticated.
     */
    isAuthenticated: boolean;
    /**
     * Sign in.
     */
    login: (options: RedirectLoginOptions) => Promise<void>;
    /**
     * Sign in with pop up window.
     */
    loginPopup: (options: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>;
    /**
     * Sign out.
     */
    logout: (options: LogoutOptions) => void;
}
export default function useAuth(tokenRequest?: AccessTokenRequestOptions): UseAuthResult;
