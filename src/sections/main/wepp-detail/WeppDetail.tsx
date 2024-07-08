//@ts-nocheck

'use client';
import { useWeppDetail } from '@/_apis/queries/wepp';
import { formatCategories } from '@/_utils';
import { Section } from '@/components/section';
import { StarRating } from '@/components/star-rating';
import { Button, Image, Card } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import WeppDetailTitle from './WeppDetailTitle';
import WeppDetailScreenshots from './WeppDetailScreenshots';

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
  const { id: weppId }: { id: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId });

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
    <article className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg p-6">
        <WeppDetailTitle wepp={wepp} />

        <WeppDetailScreenshots wepp={wepp} />

        <Section className="mb-6">
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

            {activeTab === 'updates' && <UpdateHistory updates={app.updates} />}
          </div>
        </Section>

        {/* 비슷한 앱 추천 */}
        <Section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">비슷한 앱</h3>
          {app.similarApps.map((similarApp) => (
            <SimilarAppCard key={similarApp.id} app={similarApp} />
          ))}
        </Section>
      </div>
    </article>
  );
};

export default WeppDetailScreen;
