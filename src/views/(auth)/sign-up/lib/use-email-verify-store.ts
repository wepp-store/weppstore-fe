import { Time } from '@/shared/types';
import { create } from 'zustand';

interface State {
  // 타이머 종료 시간
  endAt: Time;
  isVerified: boolean;
  userToken: string;
}
interface Action {
  setEndAt: (endAt: Time) => void;
  setIsVerified: (isVerified: boolean) => void;
  setUserToken: (userToken: string) => void;
}

export const useEmailVerifyStore = create<State & Action>((set) => ({
  // state
  userToken: '',
  endAt: null,
  isVerified: false,
  // actions
  setEndAt: (endAt) => set({ endAt }),
  setUserToken: (userToken) => set({ userToken }),
  setIsVerified: (isVerified) => set(() => ({ isVerified })),
}));
