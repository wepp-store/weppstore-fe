import React from 'react';

const WeppDashboardReviews = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">최근 리뷰</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">사용자123</p>
              <p className="text-sm text-gray-500">★★★★☆ 4.0</p>
            </div>
            <button className="text-blue-500 hover:text-blue-600">답변</button>
          </div>
          <p className="mt-2">
            좋은 앱이에요. 하지만 몇 가지 개선이 필요해 보입니다.
          </p>
        </div>
        <div className="border-b pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">사용자456</p>
              <p className="text-sm text-gray-500">★★★★★ 5.0</p>
            </div>
            <button className="text-blue-500 hover:text-blue-600">답변</button>
          </div>
          <p className="mt-2">완벽한 앱입니다! 매우 유용해요.</p>
        </div>
      </div>
      <button className="mt-4 text-indigo-500 hover:text-indigo-600">
        모든 리뷰 보기
      </button>
    </div>
  );
};

export default WeppDashboardReviews;
