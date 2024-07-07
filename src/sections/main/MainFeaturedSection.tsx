'use client';
import { IWepp } from '@/_types';
import { Section } from '@/components/section';
import React from 'react';

const FeaturedApp = ({ wepp }: { wepp: any }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex">
    <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
    <div className="flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-1">{wepp.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{wepp.description}</p>
      </div>
      <button className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded self-start">
        받기
      </button>
    </div>
  </div>
);

const MainFeaturedSection = () => {
  const featuredApps = [
    {
      id: '1',
      name: '슈퍼 게임',
      description: '흥미진진한 액션 어드벤처 게임',
    },
    {
      id: '2',
      name: '프로덕티비티 마스터',
      description: '당신의 일상을 효율적으로 관리하세요',
    },
  ];

  return (
    <Section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">추천 앱</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {featuredApps.map((app) => (
          <FeaturedApp key={app.id} wepp={app} />
        ))}
      </div>
    </Section>
  );
};

export default MainFeaturedSection;
