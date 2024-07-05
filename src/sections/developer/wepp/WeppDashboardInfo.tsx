'use client';

import { Card } from '@/components/card';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const WeppDashboardInfo = () => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <!-- 앱 정보 카드 --> */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">앱 정보</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">앱 ID:</span> APP123456
          </p>
          <p>
            <span className="font-medium">현재 버전:</span> 1.2.3
          </p>
          <p>
            <span className="font-medium">카테고리:</span> 생산성
          </p>
          <p>
            <span className="font-medium">상태:</span>{' '}
            <span className="text-green-500">승인됨</span>
          </p>
        </div>
        <Link href={`${pathname}/info`}>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            정보 수정
          </button>
        </Link>
      </Card>

      {/* <!-- 통계 카드 --> */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">통계</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">총 다운로드:</span> 10,234
          </p>
          <p>
            <span className="font-medium">이번 달 다운로드:</span> 1,234
          </p>
          <p>
            <span className="font-medium">평균 평점:</span> 4.5
          </p>
          <p>
            <span className="font-medium">활성 사용자:</span> 5,678
          </p>
        </div>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          상세 통계 보기
        </button>
      </Card>

      {/* <!-- 버전 업데이트 카드 --> */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">버전 업데이트</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="newVersion"
              className="block text-sm font-medium text-gray-700"
            >
              새 버전
            </label>
            <input
              type="text"
              id="newVersion"
              name="newVersion"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="releaseNotes"
              className="block text-sm font-medium text-gray-700"
            >
              릴리스 노트
            </label>
            <textarea
              id="releaseNotes"
              name="releaseNotes"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            업데이트 제출
          </button>
        </form>
      </Card>
    </div>
  );
};

export default WeppDashboardInfo;
