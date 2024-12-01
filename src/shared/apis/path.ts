import { OAuthProvider } from './types';

export const PATH_API = {
  // auth
  AUTH: {
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    SIGN_OUT: '/auth/sign-out',
    REFRESH_TOKEN: '/auth/refresh',
    UPLOAD_PROFILE: '/auth/upload-profile',
    // oauth
    OAUTH_SIGN_IN_URI: (provider: OAuthProvider) =>
      `/auth/oauth/${provider.toLowerCase()}/sign-in-uri`,
    OAUTH_SIGN_IN: (provider: OAuthProvider) =>
      `/auth/oauth/${provider.toLowerCase()}/sign-in`,
    // verify email
    SEND_EMAIL: '/auth/send-verify-email',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  WEPP: {
    ROOT: '/wepp',
    MINE_LIST: '/wepp/mine-list',
    MINE: (weppId: string) => `/wepp/mine/${weppId}` as const,
    SUBMIT: '/wepp/submit',
    VERIFY: '/wepp/verify',
    UPLOAD: '/wepp/upload',
    CLEAR_URL: '/wepp/clear-url',
  },
  COMMENT: {
    ROOT: '/comments',
    REPLIES: '/comments/replies',
  },
  LIKE: {
    ROOT: '/likes',
    BY_WEPP: '/likes/wepp',
    BY_USER: '/likes/user',
    HAS_LIKED: '/likes/has-liked',
  },
  CATEGORIES: {
    ROOT: '/categories',
  },
};

/**
- /oauth/{provider}/sign-in-uri
- /oauth/{provider}/sign-in
 */
