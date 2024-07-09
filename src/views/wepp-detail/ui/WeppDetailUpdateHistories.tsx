import { Section } from '@/shared/ui/section';
import React from 'react';

const WeppDetailUpdateHistories = () => {
  const updates = [
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
  ];

  return (
    <Section>
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
    </Section>
  );
};

export default WeppDetailUpdateHistories;
