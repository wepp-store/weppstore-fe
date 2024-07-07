// @ts-nocheck
'use client';
import React, { useState } from 'react';

const StarRating = ({ rating }: any) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const Review = ({ review }: any) => (
  <div className="border-b border-gray-200 py-4">
    <div className="flex items-center mb-2">
      <StarRating rating={review.rating} />
      <span className="ml-2 text-gray-600 text-sm">{review.author}</span>
    </div>
    <p className="text-gray-700">{review.content}</p>
  </div>
);

const SimilarAppCard = ({ app }: any) => (
  <div className="flex items-center space-x-4 mb-4">
    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
    <div className="flex-grow">
      <h4 className="font-semibold">{app.name}</h4>
      <p className="text-sm text-gray-500">{app.category}</p>
      <StarRating rating={app.rating} />
    </div>
    <button className="bg-gray-200 text-gray-800 text-sm font-semibold py-1 px-3 rounded">
      {app.price === '무료' ? '받기' : app.price}
    </button>
  </div>
);

const UpdateHistory = ({ updates }: any) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">업데이트 기록</h3>
    {updates.map((update, index) => (
      <div key={index} className="mb-4">
        <h4 className="font-semibold">
          {update.version} - {update.date}
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {update.changes.map((change, idx) => (
            <li key={idx}>{change}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const WeppDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('description');

  // 예시 앱 데이터
  const app = {
    id: 1,
    name: '슈퍼 게임',
    developer: '멋진 개발사',
    category: '게임',
    price: '무료',
    rating: 4.5,
    reviews: [
      {
        id: 1,
        author: '사용자1',
        rating: 5,
        content: '정말 재미있는 게임입니다!',
      },
      {
        id: 2,
        author: '사용자2',
        rating: 4,
        content: '그래픽이 아주 좋아요. 하지만 난이도가 좀 높습니다.',
      },
    ],
    description:
      '슈퍼 게임은 흥미진진한 액션 어드벤처 게임입니다. 다양한 레벨과 챌린지를 통해 여러분의 실력을 시험해보세요. 친구들과 함께 플레이하며 최고의 점수를 겨뤄보세요!',
    version: '1.2.3',
    size: '1.2 GB',
    compatibility: 'iOS 13.0 이상 필요',
    languages: '한국어, 영어, 일본어',
    updates: [
      {
        version: '1.2.3',
        date: '2024-07-01',
        changes: ['새로운 레벨 10개 추가', '성능 최적화', '마이너 버그 수정'],
      },
      {
        version: '1.2.2',
        date: '2024-06-15',
        changes: ['멀티플레이어 모드 추가', 'UI 개선'],
      },
    ],
    similarApps: [
      {
        id: 2,
        name: '어메이징 퍼즐',
        category: '게임',
        rating: 4.2,
        price: '무료',
      },
      {
        id: 3,
        name: '스페이스 어드벤처',
        category: '게임',
        rating: 4.7,
        price: '￦3,000',
      },
      {
        id: 4,
        name: '퀴즈 마스터',
        category: '교육',
        rating: 4.4,
        price: '무료',
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">앱 상세 정보</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{app.name}</h2>
              <p className="text-gray-600 mb-2">{app.developer}</p>
              <p className="text-sm text-gray-500">{app.category}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <StarRating rating={app.rating} />
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
              {app.price === '무료' ? '받기' : app.price}
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">미리보기</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {[1, 2, 3].map((screenshot) => (
                <div
                  key={screenshot}
                  className="flex-shrink-0 w-40 h-72 bg-gray-200 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('description')}
              >
                설명
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
              >
                리뷰
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'updates' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('updates')}
              >
                업데이트
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 mb-4">{app.description}</p>
                  <h4 className="font-semibold mb-2">추가 정보</h4>
                  <ul className="text-sm text-gray-600">
                    <li>버전: {app.version}</li>
                    <li>크기: {app.size}</li>
                    <li>호환성: {app.compatibility}</li>
                    <li>언어: {app.languages}</li>
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  {app.reviews.map((review) => (
                    <Review key={review.id} review={review} />
                  ))}
                </div>
              )}

              {activeTab === 'updates' && (
                <UpdateHistory updates={app.updates} />
              )}
            </div>
          </div>

          {/* 비슷한 앱 추천 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">비슷한 앱</h3>
            {app.similarApps.map((similarApp) => (
              <SimilarAppCard key={similarApp.id} app={similarApp} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeppDetailScreen;
