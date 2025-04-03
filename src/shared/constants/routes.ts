export const PATH = {
  AUTH: {
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    OAUTH_LOADING: '/oauth-loading',
  },
  MAIN: {
    WEPPS: '/wepps',
    WEPP_DETAIL: (weppId: string) => `/wepps/${weppId}`,
    GAME: '/games',
    PROFILE: '/profile',
    OTHER_PROFILE: (userId?: number) => `/profile/${userId}`,
  },
  DEVELOPER: {
    MAIN: '/developer/wepp',
    WEPP: '/developer/wepp',
    MAKE_PWA: '/developer/make-pwa',
  },
};
