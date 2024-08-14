import { create } from 'zustand';

type Step = 0 | 1 | 2 | 3 | 4;

interface Store {
  step: Step;
  setStep: (step: Step) => void;
}

export const useSignUpStepStore = create<Store>((set) => ({
  // state
  step: 0,
  // actions
  setStep: (step) => set({ step }),
}));
