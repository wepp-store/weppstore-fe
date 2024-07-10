import { PATH_API } from '../../path';

export const weppKeys = {
  all: [PATH_API.WEPP.ROOT] as const,
  detail: (weppId: string) => [...weppKeys.all, weppId] as const,
  mine: [PATH_API.WEPP.MINE] as const,
};
