import * as Auth0ClientTypes from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { BaseLoginOptions, LogoutOptions, PopupConfigOptions, PopupLoginOptions, RedirectLoginOptions } from "@auth0/auth0-spa-js/dist/typings/global";
export declare type Auth0Client = Auth0ClientTypes.default;
interface AccessTokenRequestOptions {
    /**
     * API identifier of your API.
     */
    audience: string;
    /**
     * The scopes you want to request.
     */
    scope: string;
}
interface LoginOptions extends BaseLoginOptions {
}
interface IAuth0Context {
    /**
     * The current user.
     */
    client?: Auth0Client;
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
    /**
     * Pop up window open status
     */
    popupOpen: boolean;
    /**
     * Handlers which allow the developer to plug in their own logic.
     */
    handlers: {
        /**
         * This method allows you to render a component while the user is  being redirected to Auth0.
         */
        onRedirecting?: () => React.ReactElement<any> | null;
        /**
         * This method will be called after the user has been signed in, allowing you to redirect them to some page.
         */
        onRedirectCallback?: (appState: any) => void;
        /**
         * Called when the login fails.
         */
        onLoginError?: (error: Error) => void;
        /**
         * Called when we fail to retrieve an access token.
         */
        onAccessTokenError?: (error: Error, options: AccessTokenRequestOptions) => void;
    };
}
export { LoginOptions, LogoutOptions, AccessTokenRequestOptions, IAuth0Context, PopupConfigOptions, PopupLoginOptions, RedirectLoginOptions, };
declare const _default: import("react").Context<IAuth0Context>;
export default _default;
