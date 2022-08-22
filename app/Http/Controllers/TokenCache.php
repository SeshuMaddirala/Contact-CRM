<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// namespace TokenStore;
// this is one is to be included in calendar
//storing the tokens which is to implement a way to store them in the app 

use Illuminate\Foundation\Console\VendorPublishCommand;

class TokenCache {
  
  public function storeTokens($accessToken, $user) {

    session([
        'accessToken'   => $accessToken->getToken(),
        'refreshToken'  => $accessToken->getRefreshToken(),
        'tokenExpires'  => $accessToken->getExpires(),
        'userName'      => $user->getDisplayName(),
        'userEmail'     => null !== $user->getMail() ? $user->getMail() : $user->getUserPrincipalName(),
        'userTimeZone'  => $user->getMailboxSettings()->getTimeZone()
    ]);
  }

  public function clearTokens() {
    session()->forget('accessToken');
    session()->forget('refreshToken');
    session()->forget('tokenExpires');
    session()->forget('userName');
    session()->forget('userEmail');
    session()->forget('userTimeZone');
  }

  // <GetAccessTokenSnippet>
  public function getAccessToken() {
    // Check if tokens exist
    if (empty(session()->get('accessToken')) ||
        empty(session()->get('refreshToken')) ||
        empty(session()->get('tokenExpires'))) {
      return '';
    }

    // Check if token is expired
    //Get current time + 5 minutes (to allow for time differences)
    $now = time() + 300;
    if (session()->get('tokenExpires') <= $now) {
      // Token is expired (or very close to it)
      // so let's refresh

      // Initialize the OAuth client
      
      $oauthClient = new  \League\OAuth2\Client\Provider\GenericProvider([
        'clientId'                => config("constants.MICROSOFT_GRAPH_CLIENT_ID"),
        'clientSecret'            => config("constants.MICROSOFT_GRAPH_CLIENT_SECRET"),
        'redirectUri'             => config("constants.MICROSOFT_GRAPH_REDIRECT_URI"),
        'urlAuthorize'            => config("constants.MICROSOFT_GRAPH_URL_AUTHORIZE"),
        'urlAccessToken'          => config("constants.MICROSOFT_GRAPH_URL_ACCESS_TOKENS"),
        'urlResourceOwnerDetails' => config("constants.MICROSOFT_GRAPH_URL_RESOURCEOWNERDETAILS"),
        'scopes'                  => config("constants.MICROSOFT_GRAPH_SCOPES")
      ]);

      try {
        $newToken=$oauthClient->getAccessToken('refresh_tolken', [
            'refresh_token' => session()->get('refreshtoken')
        ]);

        // Store the new values
        $this->updateTokens($newToken);

        return $newToken->getToken();
      }
      catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
        return '';
      }
    }

    // Token is still valid, just return it
    return session()->get('accessToken');
  }
  // </GetAccessTokenSnippet>

  // <UpdateTokensSnippet>
  public function updateTokens($accessToken) {
    session([
        'accessToken'   => $accessToken->getToken(),
        'refreshToken'  => $accessToken->getRefreshToken(),
        'tokenExpires'  => $accessToken->getExpires()
    ]);
  }
  // </UpdateTokensSnippet>
}
