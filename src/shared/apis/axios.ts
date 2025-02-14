import axios from 'axios';
import { API_DOMAIN } from '@/shared/constants';
import { isServer } from '@tanstack/react-query';

const TIMEOUT_TIME = 10_000;

export const axiosInstance = axios.create({
  baseURL: `${API_DOMAIN}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 on
});

// 취소 토큰을 생성하는 함수
const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;
// Request interceptor for API calls

axiosInstance.interceptors.request.use(
  async (config) => {
    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;
    return config;
  },
  (error) =>
    // 요청 전 에러 처리
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // timeout
    if (axios.isCancel(error)) {
      // 취소된 요청은 에러로 처리하지 않음
      Promise.resolve();
    }

    // 401 에러
    if (error.response?.status === 401) {
      // 로그인 페이지로 이동
      if (isServer) {
        // 서버에서는 리다이렉트 처리
        return Promise.reject({
          status: 401,
          message: 'Unauthorized request',
        });
      }
      const pathname = window.location.pathname;
      window.location.href = `/login?redirect=${pathname}`;

      return Promise.reject('Unauthorized request');
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);
