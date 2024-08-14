import React from 'react';
import { Time } from '../types';

export const useTimer = (endTime: Time) => {
  const [timer, setTimer] = React.useState<number | null>(null);
  const [isTimerCompleted, setIsTimerCompleted] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!endTime) return;
    // 종료 시간까지의 밀리초 계산
    const end = new Date(endTime).getTime();

    // 시작시 바로 실행
    setTimer(end - new Date().getTime());

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setIsTimerCompleted(true);
        setTimer(null);
      } else {
        setIsTimerCompleted(false);
        setTimer(distance);
      }
    }, 1_000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [endTime]);

  return { timer, isTimerCompleted: isTimerCompleted && !timer, setTimer };
};
