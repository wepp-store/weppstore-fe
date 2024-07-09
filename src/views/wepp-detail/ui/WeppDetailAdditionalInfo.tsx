import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailAdditionalInfo = ({ wepp }: Props) => {
  return (
    <Section>
      <h3 className="text-lg font-semibold mb-2">추가 정보</h3>
      <ul className="text-sm text-gray-600">
        <li>버전: {wepp?.version}</li>
        <li>호환성: ??</li>
        <li>언어: languages</li>
      </ul>
    </Section>
  );
};

export default WeppDetailAdditionalInfo;
