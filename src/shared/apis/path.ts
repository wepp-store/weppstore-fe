export const PATH_API = {
  // auth
  AUTH: {
    ME: '/auth/me',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    SIGN_OUT: '/auth/sign-out',
    REFRESH_TOKEN: '/auth/refresh',
    UPLOAD_PROFILE: '/auth/upload-profile',
  },
  WEPP: {
    ROOT: '/wepp',
    MINE: '/wepp/mine',
    SUBMIT: '/wepp/submit',
    VERIFY: '/wepp/verify',
    UPLOAD: '/wepp/upload',
    CLEAR_URL: '/wepp/clear-url',
  },
  COMMENT: {
    ROOT: '/comments',
  },
  CATEGORIES: {
    ROOT: '/categories',
  },
};

/**
- /oauth/{provider}/sign-in-uri
- /oauth/{provider}/sign-in
 */
