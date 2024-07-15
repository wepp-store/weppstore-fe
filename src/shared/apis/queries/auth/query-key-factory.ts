import { PATH_API } from '../../path';

export const authKeys = {
  session: ['my_session'] as const,
  profile: [PATH_API.AUTH.ME] as const,
};
