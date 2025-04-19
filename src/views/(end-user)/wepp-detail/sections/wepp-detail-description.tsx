import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Chip } from '@nextui-org/react';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailDescription = ({ wepp }: Props) => {
  const { description, isMobile, isTablet, isDesktop } = wepp || {};

  return (
    <Section>
      {/* <h3 className="text-lg font-semibold mb-2">앱 설명</h3> */}
      <p className="text-gray-700 mb-4">{description}</p>

      <div className="mt-8 flex gap-4 items-center">
        {isMobile && (
          <Chip className="bg-gray-200 rounded-md">#모바일 호환</Chip>
        )}
        {isTablet && (
          <Chip className="bg-gray-200 rounded-md">#태블릿 호환</Chip>
        )}
        {isDesktop && <Chip className="bg-gray-200 rounded-md">#PC 호환</Chip>}
      </div>
    </Section>
  );
};

export default WeppDetailDescription;
