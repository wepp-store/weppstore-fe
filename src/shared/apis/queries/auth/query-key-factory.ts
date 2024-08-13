import { PATH_API } from '../../path';
import { type OAuthProvider } from '../../types';

export const authKeys = {
  session: ['my_session'] as const,
  profile: [PATH_API.AUTH.ME] as const,
  oauthSignIn: (provider: OAuthProvider) => ['oauth-login', provider] as const,
};
