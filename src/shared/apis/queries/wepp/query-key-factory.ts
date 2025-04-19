import { PATH_API } from '../../path';

export const weppKeys = {
  all: [PATH_API.WEPP.ROOT] as const,
  detail: (weppId: string) => [...weppKeys.all, weppId] as const,
  mineList: [PATH_API.WEPP.MINE_LIST] as const,
  mine: (weppId: string) => [...weppKeys.mineList, weppId] as const,
  eventLogs: (weppId: string, from?: string, to?: string) =>
    [...weppKeys.all, PATH_API.WEPP.EVENT_LOG, weppId, from, to] as const,
};
