// OIDC Configuration for oidc-client-ts
export const oidcConfig = {
    authority: 'http://localhost:5149',
    client_id: 'spa-client',
    redirect_uri: 'http://localhost:3000/callback',
    post_logout_redirect_uri: 'http://localhost:3000/login',
    scope: 'openid profile email api1 offline_access',
    response_type: 'code',
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:3000/silent-renew',
};
