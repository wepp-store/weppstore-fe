import { IWepp } from '@/_types';
import { Section } from '@/components/section';
import { Image } from '@nextui-org/react';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailScreenshots = ({ wepp }: Props) => {
  const screenshots = wepp?.screenshots || [];

  // TODO: order 기준 screenshot 정렬 로직 필요
  // TODO: device 기준 사진 다르게도 설정

  return (
    <Section className="mb-6">
      <h3 className="text-lg font-semibold mb-2">스크린샷</h3>
      <div className="flex space-x-4 overflow-x-auto">
        {screenshots.map((screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={`screenshot ${screenshot.order}`}
            radius="lg"
            className="flex-shrink-0 w-40 h-72 bg-gray-200"
          />
        ))}
      </div>
    </Section>
  );
};

export default WeppDetailScreenshots;
