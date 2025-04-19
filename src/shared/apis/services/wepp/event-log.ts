import { axiosInstance } from '../../axios';
import { IWeppEventLog } from '@/shared/types';
import { PATH_API } from '../../path';
import { STORAGE_KEYS } from '@/shared/constants';

interface Payload {
  weppId: string;
  eventType: IWeppEventLog['eventType'];
}

const safetyParse = (key: string) => {
  const data = sessionStorage.getItem(key);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

/**
 * 조회수, 설치 버튼 클릭 수 이벤트 로그 생성 함수.
 * session storage를 사용해서 중복을 방지한다.
 */
export const createWeppEventLog = async (payload: Payload) => {
  const prevLogs = safetyParse(STORAGE_KEYS.WEPP_EVENT_LOGS);

  const isDuplicate = prevLogs.some((log: Payload) => {
    return log.weppId === payload.weppId && log.eventType === payload.eventType;
  });

  if (isDuplicate) {
    return;
  }

  try {
    // 중복이 아닐 경우, session storage에 추가
    const { data } = await axiosInstance.post(PATH_API.WEPP.EVENT_LOG, payload);
    const newLogs = [...prevLogs, payload];

    sessionStorage.setItem(
      STORAGE_KEYS.WEPP_EVENT_LOGS,
      JSON.stringify(newLogs)
    );
    return data;
  } catch (error) {
    // 실패 해도 아무 것도 안 할래.
    // fallback으로 다른 곳에 남겨놔서 다음 접속시 요청을 보내도 됨.
    console.error('Error creating event log:', error);
  }
};
