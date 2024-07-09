'use client';
import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Button, Card } from '@nextui-org/react';
import React from 'react';

const FeaturedApp = ({ wepp }: { wepp: any }) => (
  <Card className="p-4 flex-row">
    <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
    <div className="flex flex-col justify-between w-full">
      <div>
        <h3 className="font-semibold mb-1">{wepp.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{wepp.description}</p>
      </div>
      <Button color="primary" className="self-end">
        받기
      </Button>
    </div>
  </Card>
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
