'use client';

import { PATH } from '@/shared/constants';
import { Link } from '@nextui-org/react';

const Error = () => {
  return (
    <div className="m-auto text-center">
      <h1 className="text-9xl font-bold text-red-500">500</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">서버 오류</p>
      <p className="text-gray-600 mt-4 mb-8">
        죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <a
        href="/"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        새로고침
      </a>
    </div>
  );
};

export default Error;
