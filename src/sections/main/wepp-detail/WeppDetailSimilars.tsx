import { Section } from '@/components/section';
import { StarRating } from '@/components/star-rating';
import React from 'react';

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

const WeppDetailSimilars = () => {
  const similarApps = [
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
  ];

  return (
    <Section className="mt-8">
      <h3 className="text-lg font-semibold mb-2">비슷한 앱</h3>

      {similarApps.map((similarApp) => (
        <SimilarAppCard key={similarApp.id} app={similarApp} />
      ))}
    </Section>
  );
};

export default WeppDetailSimilars;
