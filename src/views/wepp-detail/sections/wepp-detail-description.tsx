import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailDescription = ({ wepp }: Props) => {
  const { description } = wepp || {};

  return (
    <Section>
      <h3 className="text-lg font-semibold mb-2">앱 설명</h3>
      <p className="text-gray-700 mb-4">{wepp?.description}</p>
    </Section>
  );
};

export default WeppDetailDescription;
